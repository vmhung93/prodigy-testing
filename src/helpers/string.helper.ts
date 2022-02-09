import { Injectable } from '@nestjs/common';

@Injectable()
export class StringHelper {
  random(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  normalizePath(path: string): string {
    const segments = path.split(/[/\\]+/);
    return segments.join('/');
  }
}
