import { Injectable, Signal, signal } from "@angular/core";
import { environmentConfigSchema, EnvironmentConfigType } from "@shared-model/environment-config";

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private readonly config = signal<EnvironmentConfigType|undefined>(undefined);

  get config$(): Signal<EnvironmentConfigType> {
    const value = this.config();
    if (value === undefined) {
      throw new Error('EnvironmentService.config$ accessed before loadConfig() resolved. Register loadConfig in APP_INITIALIZER.');
    }
    return this.config as Signal<EnvironmentConfigType>;
  }

  loadConfig(): Promise<void> {
    return fetch('/assets/environment.json')
      .then(res => res.json())
      .then(config => {
        const schemaValidation = environmentConfigSchema.safeParse(config);
        if(!schemaValidation.success) {
          const tree = schemaValidation.error.issues.map(issue => `${issue.path.join('.')}, : ${issue.message}`);
          console.error("Invalid Environment variables in environment.json file:", tree);
          throw new Error('Invalid environment config schema', { cause: tree});
        }
        this.config.set(schemaValidation.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
