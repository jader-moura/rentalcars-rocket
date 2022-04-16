import { container } from "tsyringe";
import { IDateProvider  } from "./DateProvider/IDateProvider";
import { DayJsProvider } from "./DateProvider/implementations/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayJsProvider",
    DayJsProvider
)