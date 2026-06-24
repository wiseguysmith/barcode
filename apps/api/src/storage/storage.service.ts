import { Injectable } from "@nestjs/common";

type SignedUrlInput = {
  storageKey: string;
  expiresInSeconds: number;
};

@Injectable()
export class StorageService {
  async createSignedReadUrl(input: SignedUrlInput): Promise<string> {
    const expiresAt = Date.now() + input.expiresInSeconds * 1000;
    return `https://storage.local/${encodeURIComponent(input.storageKey)}?expires=${expiresAt}`;
  }
}
