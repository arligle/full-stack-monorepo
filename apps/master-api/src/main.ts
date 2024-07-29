import { join } from "node:path";
import { ResponseInterceptor } from "@/core/app/app.response";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const port = process.env.PORT || 4000;
	const reflector = new Reflector();
	app.useGlobalPipes(new ValidationPipe());
	// 确保程序安全地关闭
	app.enableShutdownHooks();
	// globals
	app.setGlobalPrefix("api/v1");
	app.useGlobalInterceptors(new ResponseInterceptor(reflector));
	// MVC 导入hbs模版引擎
	app.useStaticAssets(join(__dirname, "..", "public"));
	app.setBaseViewsDir(join(__dirname, "..", "views"));
	app.setViewEngine("hbs");

	// swagger config
	const options = new DocumentBuilder()
		.setTitle("Fullstack Starter Monorepo")
		.setDescription("集成了Casl 和 hbs模版")
		.setVersion("1.0")
		.addOAuth2()
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("docs", app, document);
	// middlewares
	app.use(cookieParser());
	// cors
	app.enableCors();

	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
