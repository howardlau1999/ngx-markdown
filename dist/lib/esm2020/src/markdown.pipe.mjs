import { Pipe } from '@angular/core';
import { first } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "./markdown.service";
export class MarkdownPipe {
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
MarkdownPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, deps: [{ token: i1.DomSanitizer }, { token: i0.ElementRef }, { token: i2.MarkdownService }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Pipe });
MarkdownPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, name: "markdown" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0", ngImport: i0, type: MarkdownPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'markdown',
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }, { type: i0.ElementRef }, { type: i2.MarkdownService }, { type: i0.NgZone }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9zcmMvbWFya2Rvd24ucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXNCLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFeEUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBT3ZDLE1BQU0sT0FBTyxZQUFZO0lBRXZCLFlBQ1UsWUFBMEIsRUFDMUIsVUFBbUMsRUFDbkMsZUFBZ0MsRUFDaEMsSUFBWTtRQUhaLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxTQUFJLEdBQUosSUFBSSxDQUFRO0lBQ2xCLENBQUM7SUFFTCxTQUFTLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkRBQTZELE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQztZQUM1RixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO2FBQ2YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2IsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUVsRixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7eUdBMUJVLFlBQVk7dUdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUh4QixJQUFJO21CQUFDO29CQUNKLElBQUksRUFBRSxVQUFVO2lCQUNqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIE5nWm9uZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlSHRtbCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE1hcmtkb3duU2VydmljZSB9IGZyb20gJy4vbWFya2Rvd24uc2VydmljZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ21hcmtkb3duJyxcbn0pXG5leHBvcnQgY2xhc3MgTWFya2Rvd25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgbWFya2Rvd25TZXJ2aWNlOiBNYXJrZG93blNlcnZpY2UsXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICkgeyB9XG5cbiAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBTYWZlSHRtbCB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgY29uc29sZS5lcnJvcihgTWFya2Rvd25QaXBlIGhhcyBiZWVuIGludm9rZWQgd2l0aCBhbiBpbnZhbGlkIHZhbHVlIHR5cGUgWyR7dHlwZW9mIHZhbHVlfV1gKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZG93biA9IHRoaXMubWFya2Rvd25TZXJ2aWNlLmNvbXBpbGUodmFsdWUpO1xuXG4gICAgdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLm1hcmtkb3duU2VydmljZS5oaWdobGlnaHQodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpKTtcblxuICAgIHJldHVybiB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChtYXJrZG93bik7XG4gIH1cbn1cbiJdfQ==