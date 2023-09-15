import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import { presetIcons } from "unocss";

export default {
	presets: [presetWeapp(), presetIcons()],
	shortcuts: [
		{
			center: "flex justify-center items-center",
		},
	],
	transformers: [transformerClass()],
};
