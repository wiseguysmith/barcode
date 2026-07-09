import { Controller, Get, Param, Res, NotFoundException } from "@nestjs/common";
import { Response } from "express";
import { Public } from "../common/auth.guard";
import { StorageService } from "./storage.service";

@Controller("files")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Public()
  @Get("*storagePath")
  async downloadFile(@Param("storagePath") storagePathParam: string | string[], @Res() res: Response) {
    const storageKey = Array.isArray(storagePathParam) ? storagePathParam.join("/") : storagePathParam;
    try {
      const buffer = await this.storageService.readFile(storageKey);
      const filename = storageKey.split("/").pop() ?? "download";

      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(buffer);
    } catch (err) {
      throw new NotFoundException("File not found");
    }
  }
}
