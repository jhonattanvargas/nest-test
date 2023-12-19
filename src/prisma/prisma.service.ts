import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

  constructor(){
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL,
      authToken: process.env.TURSO_AUTH_TOKEN
    });
    
    const adapter = new PrismaLibSQL(libsql);
    super({adapter});
  }

  async onModuleInit() {
    await this.$connect();
  }
}