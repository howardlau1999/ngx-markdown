import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, InjectionToken, Optional, PLATFORM_ID } from '@angular/core';
import { marked } from 'marked';
import { map } from 'rxjs/operators';
import { MarkedRenderer } from './marked-renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "./marked-options";
import * as i3 from "@angular/platform-browser";
/* eslint-disable max-len */
export const errorJoyPixelsNotLoaded = '[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information';
export const errorKatexNotLoaded = '[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information';
export const errorSrcWithoutHttpClient = '[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information';
/* eslint-enable max-len */
export const SECURITY_CONTEXT = new InjectionToken('SECURITY_CONTEXT');
export class MarkdownService {
    constructor(platform, securityContext, http, options, sanitizer) {
        this.platform = platform;
        this.securityContext = securityContext;
        this.http = http;
        this.sanitizer = sanitizer;
        this.initialMarkedOptions = {
            renderer: new MarkedRenderer(),
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
MarkdownService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownService, deps: [{ token: PLATFORM_ID }, { token: SECURITY_CONTEXT }, { token: i1.HttpClient, optional: true }, { token: i2.MarkedOptions, optional: true }, { token: i3.DomSanitizer }], target: i0.ɵɵFactoryTarget.Injectable });
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
                }] }, { type: i2.MarkedOptions, decorators: [{
                    type: Optional
                }] }, { type: i3.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zcmMvbWFya2Rvd24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBbUIsTUFBTSxlQUFlLENBQUM7QUFFM0csT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVoQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7OztBQWdCbkQsNEJBQTRCO0FBQzVCLE1BQU0sQ0FBQyxNQUFNLHVCQUF1QixHQUFHLDZKQUE2SixDQUFDO0FBQ3JNLE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLHFKQUFxSixDQUFDO0FBQ3pMLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHLDJKQUEySixDQUFDO0FBQ3JNLDJCQUEyQjtBQUUzQixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBa0Isa0JBQWtCLENBQUMsQ0FBQztBQUd4RixNQUFNLE9BQU8sZUFBZTtJQWtCMUIsWUFDK0IsUUFBZ0IsRUFDWCxlQUFnQyxFQUM5QyxJQUFnQixFQUN4QixPQUFzQixFQUMxQixTQUF1QjtRQUpGLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDWCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUU1QixjQUFTLEdBQVQsU0FBUyxDQUFjO1FBckJoQix5QkFBb0IsR0FBa0I7WUFDckQsUUFBUSxFQUFFLElBQUksY0FBYyxFQUFFO1NBQy9CLENBQUM7UUFxQkEsSUFBSSxDQUFDLE9BQU8sR0FBRyxP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QUFtQixDQUFDO1FBQ3hCLE9BQU8sUUFBUTthQUNaLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVixJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUM7WUFDakMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsY0FBYyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUM7b0JBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQzthQUNuRDtZQUNELElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN0QixXQUFXLEdBQUcsY0FBYyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxjQUFjO2dCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7NEdBbkhVLGVBQWUsa0JBbUJoQixXQUFXLGFBQ1gsZ0JBQWdCO2dIQXBCZixlQUFlOzJGQUFmLGVBQWU7a0JBRDNCLFVBQVU7MERBb0JnQyxNQUFNOzBCQUE1QyxNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLGdCQUFnQjs7MEJBQ3ZCLFFBQVE7OzBCQUNSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiwgT3B0aW9uYWwsIFBMQVRGT1JNX0lELCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgbWFya2VkIH0gZnJvbSAnbWFya2VkJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgS2F0ZXhPcHRpb25zIH0gZnJvbSAnLi9rYXRleC1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlZE9wdGlvbnMgfSBmcm9tICcuL21hcmtlZC1vcHRpb25zJztcbmltcG9ydCB7IE1hcmtlZFJlbmRlcmVyIH0gZnJvbSAnLi9tYXJrZWQtcmVuZGVyZXInO1xuXG5kZWNsYXJlIHZhciByZW5kZXJNYXRoSW5FbGVtZW50OiAoZWxlbTogRWxlbWVudCwgb3B0aW9ucz86IEthdGV4T3B0aW9ucykgPT4gdm9pZDtcblxuZGVjbGFyZSBsZXQgam95cGl4ZWxzOiB7XG4gIHNob3J0bmFtZVRvVW5pY29kZShpbnB1dDogc3RyaW5nKTogc3RyaW5nO1xufTtcblxuZGVjbGFyZSBsZXQga2F0ZXg6IHtcbiAgcmVuZGVyVG9TdHJpbmcodGV4OiBzdHJpbmcsIG9wdGlvbnM/OiBLYXRleE9wdGlvbnMpOiBzdHJpbmc7XG59O1xuXG5kZWNsYXJlIGxldCBQcmlzbToge1xuICBoaWdobGlnaHRBbGxVbmRlcjogKGVsZW1lbnQ6IEVsZW1lbnQgfCBEb2N1bWVudCkgPT4gdm9pZDtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbmV4cG9ydCBjb25zdCBlcnJvckpveVBpeGVsc05vdExvYWRlZCA9ICdbbmd4LW1hcmtkb3duXSBXaGVuIHVzaW5nIHRoZSBgZW1vamlgIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIGluY2x1ZGUgRW1vamktVG9vbGtpdCBmaWxlcyB0byBgYW5ndWxhci5qc29uYCBvciB1c2UgaW1wb3J0cy4gU2VlIFJFQURNRSBmb3IgbW9yZSBpbmZvcm1hdGlvbic7XG5leHBvcnQgY29uc3QgZXJyb3JLYXRleE5vdExvYWRlZCA9ICdbbmd4LW1hcmtkb3duXSBXaGVuIHVzaW5nIHRoZSBga2F0ZXhgIGF0dHJpYnV0ZSB5b3UgKmhhdmUgdG8qIGluY2x1ZGUgS2FUZVggZmlsZXMgdG8gYGFuZ3VsYXIuanNvbmAgb3IgdXNlIGltcG9ydHMuIFNlZSBSRUFETUUgZm9yIG1vcmUgaW5mb3JtYXRpb24nO1xuZXhwb3J0IGNvbnN0IGVycm9yU3JjV2l0aG91dEh0dHBDbGllbnQgPSAnW25neC1tYXJrZG93bl0gV2hlbiB1c2luZyB0aGUgYHNyY2AgYXR0cmlidXRlIHlvdSAqaGF2ZSB0byogcGFzcyB0aGUgYEh0dHBDbGllbnRgIGFzIGEgcGFyYW1ldGVyIG9mIHRoZSBgZm9yUm9vdGAgbWV0aG9kLiBTZWUgUkVBRE1FIGZvciBtb3JlIGluZm9ybWF0aW9uJztcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG5leHBvcnQgY29uc3QgU0VDVVJJVFlfQ09OVEVYVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZWN1cml0eUNvbnRleHQ+KCdTRUNVUklUWV9DT05URVhUJyk7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNYXJrZG93blNlcnZpY2Uge1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgaW5pdGlhbE1hcmtlZE9wdGlvbnM6IE1hcmtlZE9wdGlvbnMgPSB7XG4gICAgcmVuZGVyZXI6IG5ldyBNYXJrZWRSZW5kZXJlcigpLFxuICB9O1xuXG4gIHByaXZhdGUgX29wdGlvbnM6IE1hcmtlZE9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IG9wdGlvbnMoKTogTWFya2VkT3B0aW9ucyB7IHJldHVybiB0aGlzLl9vcHRpb25zITsgfVxuICBzZXQgb3B0aW9ucyh2YWx1ZTogTWFya2VkT3B0aW9ucykge1xuICAgIHRoaXMuX29wdGlvbnMgPSB7IC4uLnRoaXMuaW5pdGlhbE1hcmtlZE9wdGlvbnMsIC4uLnZhbHVlIH07XG4gIH1cblxuICBnZXQgcmVuZGVyZXIoKTogTWFya2VkUmVuZGVyZXIgeyByZXR1cm4gdGhpcy5vcHRpb25zLnJlbmRlcmVyITsgfVxuICBzZXQgcmVuZGVyZXIodmFsdWU6IE1hcmtlZFJlbmRlcmVyKSB7XG4gICAgdGhpcy5vcHRpb25zLnJlbmRlcmVyID0gdmFsdWU7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtOiBPYmplY3QsXG4gICAgQEluamVjdChTRUNVUklUWV9DT05URVhUKSBwcml2YXRlIHNlY3VyaXR5Q29udGV4dDogU2VjdXJpdHlDb250ZXh0LFxuICAgIEBPcHRpb25hbCgpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBAT3B0aW9uYWwoKSBvcHRpb25zOiBNYXJrZWRPcHRpb25zLFxuICAgIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICkge1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBjb21waWxlKG1hcmtkb3duOiBzdHJpbmcsIGRlY29kZUh0bWwgPSBmYWxzZSwgZW1vamlmeSA9IGZhbHNlLCAgbWFya2VkT3B0aW9ucyA9IHRoaXMub3B0aW9ucyk6IHN0cmluZyB7XG4gICAgY29uc3QgdHJpbW1lZCA9IHRoaXMudHJpbUluZGVudGF0aW9uKG1hcmtkb3duKTtcbiAgICBjb25zdCBkZWNvZGVkID0gZGVjb2RlSHRtbCA/IHRoaXMuZGVjb2RlSHRtbCh0cmltbWVkKSA6IHRyaW1tZWQ7XG4gICAgY29uc3QgZW1vamlmaWVkID0gZW1vamlmeSA/IHRoaXMucmVuZGVyRW1vamkoZGVjb2RlZCkgOiBkZWNvZGVkO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gbWFya2VkKGVtb2ppZmllZCwgbWFya2VkT3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLnNhbml0aXplKHRoaXMuc2VjdXJpdHlDb250ZXh0LCBjb21waWxlZCkgfHwgJyc7XG4gIH1cblxuICBnZXRTb3VyY2Uoc3JjOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGlmICghdGhpcy5odHRwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JTcmNXaXRob3V0SHR0cENsaWVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQoc3JjLCB7IHJlc3BvbnNlVHlwZTogJ3RleHQnIH0pXG4gICAgICAucGlwZShtYXAobWFya2Rvd24gPT4gdGhpcy5oYW5kbGVFeHRlbnNpb24oc3JjLCBtYXJrZG93bikpKTtcbiAgfVxuXG4gIGhpZ2hsaWdodChlbGVtZW50PzogRWxlbWVudCB8IERvY3VtZW50KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIFByaXNtICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vTGFuZ3VhZ2VFbGVtZW50cyA9IGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgncHJlIGNvZGU6bm90KFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0pJyk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5vTGFuZ3VhZ2VFbGVtZW50cywgKHg6IEVsZW1lbnQpID0+IHguY2xhc3NMaXN0LmFkZCgnbGFuZ3VhZ2Utbm9uZScpKTtcbiAgICAgIFByaXNtLmhpZ2hsaWdodEFsbFVuZGVyKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckthdGV4KGVsZW06IEVsZW1lbnQsIG9wdGlvbnM/OiBLYXRleE9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIGthdGV4ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Yga2F0ZXgucmVuZGVyVG9TdHJpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JLYXRleE5vdExvYWRlZCk7XG4gICAgfVxuICAgIHJlbmRlck1hdGhJbkVsZW1lbnQoZWxlbSwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGRlY29kZUh0bWwoaHRtbDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSB7XG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9XG4gICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHRleHRhcmVhLmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIHRleHRhcmVhLnZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFeHRlbnNpb24oc3JjOiBzdHJpbmcsIG1hcmtkb3duOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHNyY1xuICAgICAgPyBzcmMuc3BsaXQoJz8nKVswXS5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpXG4gICAgICA6ICcnO1xuICAgIHJldHVybiBleHRlbnNpb24gIT09ICdtZCdcbiAgICAgID8gJ2BgYCcgKyBleHRlbnNpb24gKyAnXFxuJyArIG1hcmtkb3duICsgJ1xcbmBgYCdcbiAgICAgIDogbWFya2Rvd247XG4gIH1cblxuICBwcml2YXRlIHJlbmRlckVtb2ppKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtKSkge1xuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygam95cGl4ZWxzID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygam95cGl4ZWxzLnNob3J0bmFtZVRvVW5pY29kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvckpveVBpeGVsc05vdExvYWRlZCk7XG4gICAgfVxuICAgIHJldHVybiBqb3lwaXhlbHMuc2hvcnRuYW1lVG9Vbmljb2RlKGh0bWwpO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmltSW5kZW50YXRpb24obWFya2Rvd246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFtYXJrZG93bikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgaW5kZW50U3RhcnQ6IG51bWJlcjtcbiAgICByZXR1cm4gbWFya2Rvd25cbiAgICAgIC5zcGxpdCgnXFxuJylcbiAgICAgIC5tYXAobGluZSA9PiB7XG4gICAgICAgIGxldCBsaW5lSWRlbnRTdGFydCA9IGluZGVudFN0YXJ0O1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGluZUlkZW50U3RhcnQgPSBpc05hTihsaW5lSWRlbnRTdGFydClcbiAgICAgICAgICAgID8gbGluZS5zZWFyY2goL1xcU3wkLylcbiAgICAgICAgICAgIDogTWF0aC5taW4obGluZS5zZWFyY2goL1xcU3wkLyksIGxpbmVJZGVudFN0YXJ0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNOYU4oaW5kZW50U3RhcnQpKSB7XG4gICAgICAgICAgaW5kZW50U3RhcnQgPSBsaW5lSWRlbnRTdGFydDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZUlkZW50U3RhcnRcbiAgICAgICAgICA/IGxpbmUuc3Vic3RyaW5nKGxpbmVJZGVudFN0YXJ0KVxuICAgICAgICAgIDogbGluZTtcbiAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICB9XG59XG4iXX0=