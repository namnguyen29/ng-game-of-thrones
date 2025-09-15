export class StringUtil {
  public static getResourceIdFromUrl(url: string): string {
    const urlParts = url.split('/').filter(Boolean);
    return urlParts.pop() || '';
  }
}
