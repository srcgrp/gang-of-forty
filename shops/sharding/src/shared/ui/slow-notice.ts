export function hideSlowNotice(): void {
  document.getElementById('slow-connection')?.setAttribute('hidden', '');
}