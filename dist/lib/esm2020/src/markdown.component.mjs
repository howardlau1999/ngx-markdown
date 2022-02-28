import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrismPlugin } from './prism-plugin';
import * as i0 from "@angular/core";
import * as i1 from "./markdown.service";
export class MarkdownComponent {
    constructor(element, markdownService) {
        this.element = element;
        this.markdownService = markdownService;
        // Event emitters
        this.error = new EventEmitter();
        this.load = new EventEmitter();
        this.ready = new EventEmitter();
        this._commandLine = false;
        this._emoji = false;
        this._katex = false;
        this._lineHighlight = false;
        this._lineNumbers = false;
    }
    // Plugin - emoji
    get emoji() { return this._emoji; }
    set emoji(value) { this._emoji = this.coerceBooleanProperty(value); }
    // Plugin - katex
    get katex() { return this._katex; }
    set katex(value) { this._katex = this.coerceBooleanProperty(value); }
    // Plugin - lineHighlight
    get lineHighlight() { return this._lineHighlight; }
    set lineHighlight(value) { this._lineHighlight = this.coerceBooleanProperty(value); }
    // Plugin - lineNumbers
    get lineNumbers() { return this._lineNumbers; }
    set lineNumbers(value) { this._lineNumbers = this.coerceBooleanProperty(value); }
    // Plugin - commandLine
    get commandLine() { return this._commandLine; }
    set commandLine(value) { this._commandLine = this.coerceBooleanProperty(value); }
    ngOnChanges() {
        if (this.data != null) {
            this.handleData();
            return;
        }
        if (this.src != null) {
            this.handleSrc();
            return;
        }
    }
    ngAfterViewInit() {
        if (!this.data && !this.src) {
            this.handleTransclusion();
        }
    }
    render(markdown, decodeHtml = false) {
        let compiled = this.markdownService.compile(markdown, decodeHtml, this.emoji);
        if (this.katex) {
            this.markdownService.renderKatex(this.element.nativeElement, this.katexOptions);
        }
        this.handlePlugins();
        this.markdownService.highlight(this.element.nativeElement);
        this.ready.emit();
    }
    coerceBooleanProperty(value) {
        return value != null && `${String(value)}` !== 'false';
    }
    handleData() {
        this.render(this.data);
    }
    handleSrc() {
        this.markdownService
            .getSource(this.src)
            .subscribe(markdown => {
            this.render(markdown);
            this.load.emit(markdown);
        }, error => this.error.emit(error));
    }
    handleTransclusion() {
        this.render(this.element.nativeElement.innerHTML, true);
    }
    handlePlugins() {
        if (this.commandLine) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.CommandLine);
            this.setPluginOptions(this.element.nativeElement, {
                dataFilterOutput: this.filterOutput,
                dataHost: this.host,
                dataPrompt: this.prompt,
                dataOutput: this.output,
                dataUser: this.user,
            });
        }
        if (this.lineHighlight) {
            this.setPluginOptions(this.element.nativeElement, { dataLine: this.line, dataLineOffset: this.lineOffset });
        }
        if (this.lineNumbers) {
            this.setPluginClass(this.element.nativeElement, PrismPlugin.LineNumbers);
            this.setPluginOptions(this.element.nativeElement, { dataStart: this.start });
        }
    }
    setPluginClass(element, plugin) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            const classes = plugin instanceof Array ? plugin : [plugin];
            preElements.item(i).classList.add(...classes);
        }
    }
    setPluginOptions(element, options) {
        const preElements = element.querySelectorAll('pre');
        for (let i = 0; i < preElements.length; i++) {
            Object.keys(options).forEach(option => {
                const attributeValue = options[option];
                if (attributeValue) {
                    const attributeName = this.toLispCase(option);
                    preElements.item(i).setAttribute(attributeName, attributeValue.toString());
                }
            });
        }
    }
    toLispCase(value) {
        const upperChars = value.match(/([A-Z])/g);
        if (!upperChars) {
            return value;
        }
        let str = value.toString();
        for (let i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), '-' + upperChars[i].toLowerCase());
        }
        if (str.slice(0, 1) === '-') {
            str = str.slice(1);
        }
        return str;
    }
}
MarkdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownComponent, deps: [{ token: i0.ElementRef }, { token: i1.MarkdownService }], target: i0.ɵɵFactoryTarget.Component });
MarkdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: MarkdownComponent, selector: "markdown, [markdown]", inputs: { data: "data", src: "src", emoji: "emoji", katex: "katex", katexOptions: "katexOptions", lineHighlight: "lineHighlight", line: "line", lineOffset: "lineOffset", lineNumbers: "lineNumbers", start: "start", commandLine: "commandLine", filterOutput: "filterOutput", host: "host", prompt: "prompt", output: "output", user: "user" }, outputs: { error: "error", load: "load", ready: "ready" }, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'markdown, [markdown]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.MarkdownService }]; }, propDecorators: { data: [{
                type: Input
            }], src: [{
                type: Input
            }], emoji: [{
                type: Input
            }], katex: [{
                type: Input
            }], katexOptions: [{
                type: Input
            }], lineHighlight: [{
                type: Input
            }], line: [{
                type: Input
            }], lineOffset: [{
                type: Input
            }], lineNumbers: [{
                type: Input
            }], start: [{
                type: Input
            }], commandLine: [{
                type: Input
            }], filterOutput: [{
                type: Input
            }], host: [{
                type: Input
            }], prompt: [{
                type: Input
            }], output: [{
                type: Input
            }], user: [{
                type: Input
            }], error: [{
                type: Output
            }], load: [{
                type: Output
            }], ready: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3NyYy9tYXJrZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0csT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPN0MsTUFBTSxPQUFPLGlCQUFpQjtJQXdENUIsWUFDUyxPQUFnQyxFQUNoQyxlQUFnQztRQURoQyxZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFiekMsaUJBQWlCO1FBQ1AsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFbkMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDckIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixpQkFBWSxHQUFHLEtBQUssQ0FBQztJQUt6QixDQUFDO0lBaERMLGlCQUFpQjtJQUNqQixJQUNJLEtBQUssS0FBYyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksS0FBSyxDQUFDLEtBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUUsaUJBQWlCO0lBQ2pCLElBQ0ksS0FBSyxLQUFjLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLENBQUMsS0FBYyxJQUFJLElBQUksQ0FB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S0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUdJLEtBQUs7c0JBQWQsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBLYXRleE9wdGlvbnMgfSBmcm9tICcuL2thdGV4LW9wdGlvbnMnO1xuaW1wb3J0IHsgTWFya2Rvd25TZXJ2aWNlIH0gZnJvbSAnLi9tYXJrZG93bi5zZXJ2aWNlJztcbmltcG9ydCB7IFByaXNtUGx1Z2luIH0gZnJvbSAnLi9wcmlzbS1wbHVnaW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9jb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdtYXJrZG93biwgW21hcmtkb3duXScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtkb3duQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0IHtcblxuICBwcm90ZWN0ZWQgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Vtb2ppOiBib29sZWFuIHwgJyc7XG4gIHByb3RlY3RlZCBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfa2F0ZXg6IGJvb2xlYW4gfCAnJztcbiAgcHJvdGVjdGVkIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9saW5lSGlnaGxpZ2h0OiBib29sZWFuIHwgJyc7XG4gIHByb3RlY3RlZCBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbGluZU51bWJlcnM6IGJvb2xlYW4gfCAnJztcbiAgcHJvdGVjdGVkIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jb21tYW5kTGluZTogYm9vbGVhbiB8ICcnO1xuXG4gIEBJbnB1dCgpIGRhdGE6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgc3JjOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gUGx1Z2luIC0gZW1vamlcbiAgQElucHV0KClcbiAgZ2V0IGVtb2ppKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZW1vamk7IH1cbiAgc2V0IGVtb2ppKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2Vtb2ppID0gdGhpcy5jb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgLy8gUGx1Z2luIC0ga2F0ZXhcbiAgQElucHV0KClcbiAgZ2V0IGthdGV4KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fa2F0ZXg7IH1cbiAgc2V0IGthdGV4KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2thdGV4ID0gdGhpcy5jb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG4gIEBJbnB1dCgpIGthdGV4T3B0aW9uczogS2F0ZXhPcHRpb25zIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFBsdWdpbiAtIGxpbmVIaWdobGlnaHRcbiAgQElucHV0KClcbiAgZ2V0IGxpbmVIaWdobGlnaHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9saW5lSGlnaGxpZ2h0OyB9XG4gIHNldCBsaW5lSGlnaGxpZ2h0KHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2xpbmVIaWdobGlnaHQgPSB0aGlzLmNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgQElucHV0KCkgbGluZTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGxpbmVPZmZzZXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvLyBQbHVnaW4gLSBsaW5lTnVtYmVyc1xuICBASW5wdXQoKVxuICBnZXQgbGluZU51bWJlcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9saW5lTnVtYmVyczsgfVxuICBzZXQgbGluZU51bWJlcnModmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fbGluZU51bWJlcnMgPSB0aGlzLmNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgQElucHV0KCkgc3RhcnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvLyBQbHVnaW4gLSBjb21tYW5kTGluZVxuICBASW5wdXQoKVxuICBnZXQgY29tbWFuZExpbmUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jb21tYW5kTGluZTsgfVxuICBzZXQgY29tbWFuZExpbmUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fY29tbWFuZExpbmUgPSB0aGlzLmNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgQElucHV0KCkgZmlsdGVyT3V0cHV0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGhvc3Q6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgQElucHV0KCkgcHJvbXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG91dHB1dDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBASW5wdXQoKSB1c2VyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gRXZlbnQgZW1pdHRlcnNcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBsb2FkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSByZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBwcml2YXRlIF9jb21tYW5kTGluZSA9IGZhbHNlO1xuICBwcml2YXRlIF9lbW9qaSA9IGZhbHNlO1xuICBwcml2YXRlIF9rYXRleCA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lSGlnaGxpZ2h0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2xpbmVOdW1iZXJzID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHB1YmxpYyBtYXJrZG93blNlcnZpY2U6IE1hcmtkb3duU2VydmljZSxcbiAgKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaGFuZGxlRGF0YSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zcmMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5oYW5kbGVTcmMoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRhdGEgJiYgIXRoaXMuc3JjKSB7XG4gICAgICB0aGlzLmhhbmRsZVRyYW5zY2x1c2lvbigpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcihtYXJrZG93bjogc3RyaW5nLCBkZWNvZGVIdG1sID0gZmFsc2UpOiB2b2lkIHtcbiAgICBsZXQgY29tcGlsZWQgPSB0aGlzLm1hcmtkb3duU2VydmljZS5jb21waWxlKG1hcmtkb3duLCBkZWNvZGVIdG1sLCB0aGlzLmVtb2ppKTtcbiAgICBpZiAodGhpcy5rYXRleCkge1xuICAgICAgdGhpcy5tYXJrZG93blNlcnZpY2UucmVuZGVyS2F0ZXgodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHRoaXMua2F0ZXhPcHRpb25zKVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVBsdWdpbnMoKTtcbiAgICB0aGlzLm1hcmtkb3duU2VydmljZS5oaWdobGlnaHQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMucmVhZHkuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWU6IGJvb2xlYW4gfCAnJyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGAke1N0cmluZyh2YWx1ZSl9YCAhPT0gJ2ZhbHNlJztcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlRGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlbmRlcih0aGlzLmRhdGEhKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU3JjKCk6IHZvaWQge1xuICAgIHRoaXMubWFya2Rvd25TZXJ2aWNlXG4gICAgICAuZ2V0U291cmNlKHRoaXMuc3JjISlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIG1hcmtkb3duID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcihtYXJrZG93bik7XG4gICAgICAgICAgdGhpcy5sb2FkLmVtaXQobWFya2Rvd24pO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpLFxuICAgICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlVHJhbnNjbHVzaW9uKCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCwgdHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVBsdWdpbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29tbWFuZExpbmUpIHtcbiAgICAgIHRoaXMuc2V0UGx1Z2luQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFByaXNtUGx1Z2luLkNvbW1hbmRMaW5lKTtcbiAgICAgIHRoaXMuc2V0UGx1Z2luT3B0aW9ucyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwge1xuICAgICAgICBkYXRhRmlsdGVyT3V0cHV0OiB0aGlzLmZpbHRlck91dHB1dCxcbiAgICAgICAgZGF0YUhvc3Q6IHRoaXMuaG9zdCxcbiAgICAgICAgZGF0YVByb21wdDogdGhpcy5wcm9tcHQsXG4gICAgICAgIGRhdGFPdXRwdXQ6IHRoaXMub3V0cHV0LFxuICAgICAgICBkYXRhVXNlcjogdGhpcy51c2VyLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmxpbmVIaWdobGlnaHQpIHtcbiAgICAgIHRoaXMuc2V0UGx1Z2luT3B0aW9ucyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgeyBkYXRhTGluZTogdGhpcy5saW5lLCBkYXRhTGluZU9mZnNldDogdGhpcy5saW5lT2Zmc2V0IH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5saW5lTnVtYmVycykge1xuICAgICAgdGhpcy5zZXRQbHVnaW5DbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgUHJpc21QbHVnaW4uTGluZU51bWJlcnMpO1xuICAgICAgdGhpcy5zZXRQbHVnaW5PcHRpb25zKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCB7IGRhdGFTdGFydDogdGhpcy5zdGFydCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldFBsdWdpbkNsYXNzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwbHVnaW46IHN0cmluZyB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBwbHVnaW4gaW5zdGFuY2VvZiBBcnJheSA/IHBsdWdpbiA6IFtwbHVnaW5dO1xuICAgICAgcHJlRWxlbWVudHMuaXRlbShpKS5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0UGx1Z2luT3B0aW9ucyhlbGVtZW50OiBIVE1MRWxlbWVudCwgb3B0aW9uczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfCBzdHJpbmcgfCBzdHJpbmdbXSB8IHVuZGVmaW5lZCB9KTogdm9pZCB7XG4gICAgY29uc3QgcHJlRWxlbWVudHMgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ByZScpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSBvcHRpb25zW29wdGlvbl07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZU5hbWUgPSB0aGlzLnRvTGlzcENhc2Uob3B0aW9uKTtcbiAgICAgICAgICBwcmVFbGVtZW50cy5pdGVtKGkpLnNldEF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0b0xpc3BDYXNlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHVwcGVyQ2hhcnMgPSB2YWx1ZS5tYXRjaCgvKFtBLVpdKS9nKTtcbiAgICBpZiAoIXVwcGVyQ2hhcnMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgbGV0IHN0ciA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgZm9yIChsZXQgaSA9IDAsIG4gPSB1cHBlckNoYXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgc3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cCh1cHBlckNoYXJzW2ldKSwgJy0nICsgdXBwZXJDaGFyc1tpXS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9XG4gICAgaWYgKHN0ci5zbGljZSgwLCAxKSA9PT0gJy0nKSB7XG4gICAgICBzdHIgPSBzdHIuc2xpY2UoMSk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbiJdfQ==