import { ElementRef, NgZone, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownService } from './markdown.service';
import * as i0 from "@angular/core";
export declare class MarkdownPipe implements PipeTransform {
    private domSanitizer;
    private elementRef;
    private markdownService;
    private zone;
    constructor(domSanitizer: DomSanitizer, elementRef: ElementRef<HTMLElement>, markdownService: MarkdownService, zone: NgZone);
    transform(value: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<MarkdownPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MarkdownPipe, "markdown">;
}
