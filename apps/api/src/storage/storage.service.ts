import { Injectable } from "@nestjs/common";
import { createWriteStream, promises as fs } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

type SignedUrlInput = {
  storageKey: string;
  expiresInSeconds: number;
};

@Injectable()
export class StorageService {
  private readonly storagePath = join(process.cwd(), ".storage");

  constructor() {
    this.ensureStorageDir();
  }

  private async ensureStorageDir() {
    try {
      await fs.mkdir(this.storagePath, { recursive: true });
    } catch (err) {
      // ignored
    }
  }

  async uploadFile(
    buffer: Buffer,
    filename: string
  ): Promise<{ storageKey: string; url: string }> {
    const storageKey = `${randomUUID()}/${filename}`;
    const filePath = join(this.storagePath, storageKey);

    await fs.mkdir(join(this.storagePath, randomUUID()), { recursive: true });
    await fs.writeFile(filePath, buffer);

    return {
      storageKey,
      url: `/api/files/${storageKey}`
    };
  }

  async createSignedReadUrl(input: SignedUrlInput): Promise<string> {
    const expiresAt = Date.now() + input.expiresInSeconds * 1000;
    // In real implementation, this would be signed with R2 credentials
    return `/api/files/${input.storageKey}?expires=${expiresAt}&token=mock_${randomUUID()}`;
  }

  async readFile(storageKey: string): Promise<Buffer> {
    const filePath = join(this.storagePath, storageKey);
    return fs.readFile(filePath);
  }

  async deleteFile(storageKey: string): Promise<void> {
    const filePath = join(this.storagePath, storageKey);
    try {
      await fs.unlink(filePath);
    } catch (err) {
      // file may not exist
    }
  }
}
