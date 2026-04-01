import { useState, useCallback } from 'react';
import { DEFAULT_SITE_CONTENT, SiteContent } from '@/mocks/defaultContent';

const STORAGE_KEY = 'webagency_content';

function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SITE_CONTENT, ...parsed };
    }
  } catch {
    // ignore
  }
  return DEFAULT_SITE_CONTENT;
}

function saveContent(content: SiteContent): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // ignore
  }
}

let globalContent: SiteContent = loadContent();
const listeners: Array<() => void> = [];

function subscribeContentChange(fn: () => void) {
  listeners.push(fn);
  return () => {
    const idx = listeners.indexOf(fn);
    if (idx >= 0) listeners.splice(idx, 1);
  };
}

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

export function updateGlobalContent(updater: (prev: SiteContent) => SiteContent) {
  globalContent = updater(globalContent);
  saveContent(globalContent);
  notifyListeners();
}

export function useSiteContent() {
  const [, setTick] = useState(0);

  const rerender = useCallback(() => setTick((t) => t + 1), []);

  const unsubscribe = subscribeContentChange(rerender);
  // cleanup on unmount via useEffect is handled externally when needed

  const updateContent = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    updateGlobalContent(updater);
    unsubscribe();
  }, [unsubscribe]);

  return {
    content: globalContent,
    updateContent,
  };
}

export function getSiteContent(): SiteContent {
  return globalContent;
}
