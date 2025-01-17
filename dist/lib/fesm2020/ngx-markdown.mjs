import * as i0 from '@angular/core';
import { Pipe, InjectionToken, PLATFORM_ID, Injectable, Inject, Optional, EventEmitter, Component, Input, Output, SecurityContext, NgModule } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Renderer, marked } from 'marked';
export { Renderer as MarkedRenderer } from 'marked';
import { map, first } from 'rxjs/operators';
import * as i1 from '@angular/common/http';
import * as i3 from '@angular/platform-browser';

/* eslint-disable */
class KatexOptions {
}

class LanguagePipe {
    transform(value, language) {
        if (value == null) {
            value = '';
        }
        if (language == null) {
            language = '';
        }
        if (typeof value !== 'string') {
            console.error(`LanguagePipe has been invoked with an invalid value type [${typeof value}]`);
            return value;
        }
        if (typeof language !== 'string') {
            console.error(`LanguagePipe has been invoked with an invalid parameter [${typeof language}]`);
            return value;
        }
        return '```' + language + '\n' + value + '\n```';
    }
}
LanguagePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LanguagePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
LanguagePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LanguagePipe, name: "language" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: LanguagePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'language',
                }]
        }] });

var PrismPlugin;
(function (PrismPlugin) {
    PrismPlugin["CommandLine"] = "command-line";
    PrismPlugin["LineHighlight"] = "line-highlight";
    PrismPlugin["LineNumbers"] = "line-numbers";
})(PrismPlugin || (PrismPlugin = {}));

class MarkedOptions {
}

/* eslint-disable max-len */
const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
/* eslint-enable max-len */
const SECURITY_CONTEXT = new InjectionToken('SECURITY_CONTEXT');
class MarkdownService {
    constructor(platform, securityContext, http, options, sanitizer) {
        this.platform = platform;
        this.securityContext = securityContext;
        this.http = http;
        this.sanitizer = sanitizer;
        this.initialMarkedOptions = {
            renderer: new Renderer(),
        };
        this.options = options;
    }
    get options() { return this._options; }
    set options(value) {
        this._options = { ...this.initialMarkedOptions, ...value };
    }
    get renderer() { return this.options.renderer; }
    set renderer(value) {
        this.options.renderer = value;
    }
    compile(markdown, decodeHtml = false, emojify = false, markedOptions = this.options) {
        const trimmed = this.trimIndentation(markdown);
        const decoded = decodeHtml ? this.decodeHtml(trimmed) : trimmed;
        const emojified = emojify ? this.renderEmoji(decoded) : decoded;
        const compiled = marked(emojified, markedOptions);
        return this.sanitizer.sanitize(this.securityContext, compiled) || '';
    }
    getSource(src) {
        if (!this.http) {
            throw new Error(errorSrcWithoutHttpClient);
        }
        return this.http
            .get(src, { responseType: 'text' })
            .pipe(map(markdown => this.handleExtension(src, markdown)));
    }
    highlight(element) {
        if (!isPlatformBrowser(this.platform)) {
            return;
        }
        if (typeof Prism !== 'undefined') {
            if (!element) {
                element = document;
            }
            const noLanguageElements = element.querySelectorAll('pre code:not([class*="language-"])');
            Array.prototype.forEach.call(noLanguageElements, (x) => x.classList.add('language-none'));
            Prism.highlightAllUnder(element);
        }
    }
    renderKatex(elem, options) {
        if (typeof katex === 'undefined' || typeof katex.renderToString === 'undefined') {
            throw new Error(errorKatexNotLoaded);
        }
        renderMathInElement(elem, options);
    }
    decodeHtml(html) {
        if (!isPlatformBrowser(this.platform)) {
            return html;
        }
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    }
    handleExtension(src, markdown) {
        const extension = src
            ? src.split('?')[0].split('.').splice(-1).join()
            : '';
        return extension !== 'md'
            ? '```' + extension + '\n' + markdown + '\n```'
            : markdown;
    }
    renderEmoji(html) {
        if (!isPlatformBrowser(this.platform)) {
            return html;
        }
        if (typeof joypixels === 'undefined' || typeof joypixels.shortnameToUnicode === 'undefined') {
            throw new Error(errorJoyPixelsNotLoaded);
        }
        return joypixels.shortnameToUnicode(html);
    }
    trimIndentation(markdown) {
        if (!markdown) {
            return '';
        }
        let indentStart;
        return markdown
            .split('\n')
            .map(line => {
            let lineIdentStart = indentStart;
            if (line.length > 0) {
                lineIdentStart = isNaN(lineIdentStart)
                    ? line.search(/\S|$/)
                    : Math.min(line.search(/\S|$/), lineIdentStart);
            }
            if (isNaN(indentStart)) {
                indentStart = lineIdentStart;
            }
            return lineIdentStart
                ? line.substring(lineIdentStart)
                : line;
        }).join('\n');
    }
}
MarkdownService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownService, deps: [{ token: PLATFORM_ID }, { token: SECURITY_CONTEXT }, { token: i1.HttpClient, optional: true }, { token: MarkedOptions, optional: true }, { token: i3.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
MarkdownService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.SecurityContext, decorators: [{
                    type: Inject,
                    args: [SECURITY_CONTEXT]
                }] }, { type: i1.HttpClient, decorators: [{
                    type: Optional
                }] }, { type: MarkedOptions, decorators: [{
                    type: Optional
                }] }, { type: i3.DomSanitizer }]; } });

class MarkdownComponent {
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
MarkdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownComponent, deps: [{ token: i0.ElementRef }, { token: MarkdownService }], target: i0.ɵɵFactoryTarget.Component });
MarkdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0", type: MarkdownComponent, selector: "markdown, [markdown]", inputs: { data: "data", src: "src", emoji: "emoji", katex: "katex", katexOptions: "katexOptions", lineHighlight: "lineHighlight", line: "line", lineOffset: "lineOffset", lineNumbers: "lineNumbers", start: "start", commandLine: "commandLine", filterOutput: "filterOutput", host: "host", prompt: "prompt", output: "output", user: "user" }, outputs: { error: "error", load: "load", ready: "ready" }, usesOnChanges: true, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownComponent, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: 'markdown, [markdown]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: MarkdownService }]; }, propDecorators: { data: [{
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

class MarkdownPipe {
    constructor(domSanitizer, elementRef, markdownService, zone) {
        this.domSanitizer = domSanitizer;
        this.elementRef = elementRef;
        this.markdownService = markdownService;
        this.zone = zone;
    }
    transform(value) {
        if (value == null) {
            return '';
        }
        if (typeof value !== 'string') {
            console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof value}]`);
            return value;
        }
        const markdown = this.markdownService.compile(value);
        this.zone.onStable
            .pipe(first())
            .subscribe(() => this.markdownService.highlight(this.elementRef.nativeElement));
        return this.domSanitizer.bypassSecurityTrustHtml(markdown);
    }
}
MarkdownPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, deps: [{ token: i3.DomSanitizer }, { token: i0.ElementRef }, { token: MarkdownService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Pipe });
MarkdownPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, name: "markdown" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'markdown',
                }]
        }], ctorParameters: function () { return [{ type: i3.DomSanitizer }, { type: i0.ElementRef }, { type: MarkdownService }, { type: i0.NgZone }]; } });

const sharedDeclarations = [
    LanguagePipe,
    MarkdownComponent,
    MarkdownPipe,
];
class MarkdownModule {
    static forRoot(markdownModuleConfig) {
        return {
            ngModule: MarkdownModule,
            providers: [
                MarkdownService,
                markdownModuleConfig && markdownModuleConfig.loader || [],
                markdownModuleConfig && markdownModuleConfig.markedOptions || [],
                {
                    provide: SECURITY_CONTEXT,
                    useValue: markdownModuleConfig && markdownModuleConfig.sanitize != null
                        ? markdownModuleConfig.sanitize
                        : SecurityContext.HTML,
                },
            ],
        };
    }
    static forChild() {
        return {
            ngModule: MarkdownModule,
        };
    }
}
MarkdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MarkdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownModule, declarations: [LanguagePipe,
        MarkdownComponent,
        MarkdownPipe], exports: [LanguagePipe,
        MarkdownComponent,
        MarkdownPipe] });
MarkdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownModule, decorators: [{
            type: NgModule,
            args: [{
                    exports: sharedDeclarations,
                    declarations: sharedDeclarations,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { KatexOptions, LanguagePipe, MarkdownComponent, MarkdownModule, MarkdownPipe, MarkdownService, MarkedOptions, PrismPlugin, SECURITY_CONTEXT, errorJoyPixelsNotLoaded, errorKatexNotLoaded, errorSrcWithoutHttpClient };
