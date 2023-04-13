import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { LicenseManager } from "ag-grid-enterprise";

import { AppModule } from "./app/app.module";

LicenseManager.setLicenseKey(
  "For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-16_July_2022_[v2]_MTY1NzkyNjAwMDAwMA==23eb0739d30abf6c9ec2837d9d996499"
);
setTimeout(() => {
  platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
});
