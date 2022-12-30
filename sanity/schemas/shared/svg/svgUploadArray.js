import SvgPreviewComponent from './svgPreviewComponent';

export default {
  type: 'object',
  name: 'svgUpload',
  title: 'Client Image Upload',
  fields: [
    {
      type: 'svgUploadPreview',
      name: 'source',
      title: 'Client SVG Logo',
    },
  ],
  preview: {
    select: {
      svgHtml: 'source',
    },
    component: SvgPreviewComponent,
  },
};
