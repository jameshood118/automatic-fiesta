// lib/htmlProcessor.tsx

import DOMPurify from 'dompurify';
// Import JSDOM for server-side sanitization
import { JSDOM } from 'jsdom'; 
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import { Fragment } from 'react';

// Initialize DOMPurify for the server environment
const window = new JSDOM('').window;
const serverPurify = DOMPurify(window);

/**
 * Sanitizes and Parses raw HTML content from WordPress, 
 * correcting A11Y issues and ensuring security.
 * * @param rawHtml The raw HTML string (e.g., post.content or product.description).
 * @returns A safe React element tree.
 */
export function safeHtml(rawHtml: string) {
  // 1. SECURITY: Sanitize the HTML first to prevent XSS attacks
  const cleanHtml = serverPurify.sanitize(rawHtml, {
    // Optional: Add custom allowed tags/attributes if needed (e.g., custom Tailwind classes)
    // ALLOWED_TAGS: ['p', 'img', 'a', 'h1', 'h2', 'h3', 'ul', 'li', 'div', ...],
    // ALLOWED_ATTR: ['class', 'id', 'href', 'alt', 'src', 'aria-*', ...],
  });

  // 2. A11Y CORRECTION: Parse the clean HTML and intercept/replace nodes
  return parse(cleanHtml, {
    replace(node) {
      // Ensure we are only looking at elements (tags)
      if (node.type !== 'tag') {
        return;
      }

      const element = node as Element;

      // 💡 A11Y Fix Example 1: Correcting Heading Hierarchy
      // If a content editor accidentally used an H4 instead of an H2, 
      // we can correct the semantics here based on context.
      if (element.name === 'h4') {
        return <h2 className="text-xl font-semibold mt-4 mb-2">{domToReact(node.children as DOMNode[])}</h2>;
      }
      
      // 💡 A11Y Fix Example 2: Ensuring Images have proper attributes
      if (element.name === 'img' && !element.attribs.alt) {
        // Log a warning for content creators
        console.warn(`A11Y WARNING: Image source ${element.attribs.src} is missing alt text!`);
        // Add a temporary, but functional alt attribute to prevent screen reader errors
        element.attribs['alt'] = 'Missing description - needs immediate fix.';
      }
      
      // 💡 Design Consistency Example: Applying Tailwind Classes
      // Force all <a> tags (links) inside post content to use your design system's style.
      if (element.name === 'a') {
        element.attribs.className = 'text-blue-600 hover:text-blue-800 underline';
        // Ensure links open in a new tab if they are external
        if (!element.attribs.href?.startsWith('/')) {
            element.attribs.target = '_blank';
            element.attribs.rel = 'noopener noreferrer';
        }
      }

      // Return a Fragment to allow the parser to continue with the default rendering of other nodes
      return <Fragment></Fragment>; 
    },
  });
}