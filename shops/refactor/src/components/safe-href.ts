export const safeHref = (value: string): string => /^#[a-z][a-z0-9-]*$/i.test(value) ? value : '#contact';
