import { TuiButton, TuiRoot, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextarea, TuiTabs } from '@taiga-ui/kit';
import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY } from '@taiga-ui/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    TuiDataListWrapper,
    TuiSelect,
    TuiTabs,
    TuiTextfield,
    FormsModule,
    TuiButton,
    TuiChevron,
    TuiIcon,
    TuiRoot,
    TuiTextarea,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('doc-aid');

  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected readonly models = ['Gemini Flash 2.5', 'Gemini Pro 2.5', 'ChatGPT 5.0'];
  protected selectedModel = this.models[0];

  protected inputText = '';

  protected tabIndex = 0;

  get themeIcon(): string {
    return this.darkMode() ? 'sun' : 'moon';
  }

  protected toggleTheme(): void {
    this.darkMode.set(!this.darkMode());
    this.storage?.setItem(this.key, this.darkMode() ? 'dark' : 'light');
  }

  constructor() {
    const theme = this.storage?.getItem(this.key);
    if (theme === 'dark') {
      this.darkMode.set(true);
    }
  }
}
