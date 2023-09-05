-- CreateEnum
CREATE TYPE "ParamType" AS ENUM ('String', 'Number', 'Boolean', 'Object', 'Array');

-- CreateTable
CREATE TABLE "Bot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" TEXT NOT NULL,
    "bot_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Param" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "param_type" "ParamType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Param_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParamValue" (
    "id" TEXT NOT NULL,
    "bot_id" TEXT NOT NULL,
    "param_id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ParamValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bot_UserId_Index" ON "Bot"("user_id");

-- CreateIndex
CREATE INDEX "Persona_BotId_Index" ON "Persona"("bot_id");

-- CreateIndex
CREATE INDEX "ParamValue_BotId_Index" ON "ParamValue"("bot_id");

-- CreateIndex
CREATE INDEX "ParamValue_ParamId_Index" ON "ParamValue"("param_id");

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Persona" ADD CONSTRAINT "Persona_bot_id_fkey" FOREIGN KEY ("bot_id") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParamValue" ADD CONSTRAINT "ParamValue_bot_id_fkey" FOREIGN KEY ("bot_id") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParamValue" ADD CONSTRAINT "ParamValue_param_id_fkey" FOREIGN KEY ("param_id") REFERENCES "Param"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
