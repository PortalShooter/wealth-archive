export default {
  title: 'Article',
  name: 'article',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => [
        Rule.required().custom((str) =>
          str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
        ),
      ],
    },
    {
      title: 'Slug',
      description: 'This value will be used for the URL of the page',
      name: 'slug',
      type: 'uniqueSlug',
    },
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
      options: {},
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      validation: (Rule) => [
        Rule.required().custom((str) =>
          str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
        ),
      ],
    },
    {
      title: 'Main image',
      name: 'mainImage',
      type: 'imageWithAlt',
      description: 'Image shown on category, search and top of article',
    },
    {
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Published at',
      name: 'publishedAt',
      type: 'datetime',
    },
    {
      title: 'Read time (minutes).',
      name: 'readTime',
      type: 'number',
      description: '(Optional)',
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      description: '(Optional)',
      of: [
        {
          title: 'Plain text with heading block',
          name: 'textBlock',
          type: 'object',
          fields: [
            {
              title: 'Heading',
              name: 'heading',
              type: 'string',
              description: '(Optional)',
            },
            {
              title: 'Heading primary',
              name: 'isHeadingPrimary',
              type: 'boolean',
              description: 'Specify size of heading with this option. Primary is bigger',
              initialValue: false,
            },
            {
              title: 'Text',
              name: 'text',
              type: 'string',
              description: '(Optional)',
            },
          ],
          preview: {
            select: {
              heading: 'heading',
              text: 'text',
            },
            prepare(selection) {
              return {
                title: selection.heading ?? selection.text ?? ' ',
                subtitle: 'Text with heading block',
              };
            },
          },
        },
        {
          title: 'List with heading block',
          name: 'listBlock',
          type: 'object',
          fields: [
            {
              title: 'Heading',
              name: 'heading',
              type: 'string',
              description: '(Optional)',
            },
            {
              title: 'List',
              name: 'list',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => [
                Rule.required().custom((str) => {
                  if (!str) {
                    return true;
                  }
                  const errorMsg = 'All fields must contain not only spaces';
                  const res = str.reduce((acc, elem) => {
                    if (!acc) {
                      return false;
                    }

                    return elem.trim() !== '';
                  }, true);

                  if (!res) {
                    return errorMsg;
                  }
                  return true;
                }),
              ],
            },
          ],
          preview: {
            select: {
              heading: 'heading',
            },
            prepare(selection) {
              return {
                title: selection.heading ?? ' ',
                subtitle: 'List with heading block',
              };
            },
          },
        },
        {
          title: 'Formatted text with heading block',
          name: 'blockContent',
          type: 'object',
          fields: [
            {
              title: 'Heading',
              name: 'heading',
              type: 'string',
              description: '(Optional)',
            },
            {
              title: 'Heading primary',
              name: 'isHeadingPrimary',
              type: 'boolean',
              description: 'Specify size of heading with this option. Primary is bigger',
              initialValue: false,
            },
            {
              name: 'blockContent',
              title: 'Block Content',
              type: 'blockContent',
            },
          ],
          preview: {
            select: {
              heading: 'heading',
              text: 'text',
            },
            prepare(selection) {
              return {
                title: selection.heading ?? ' ',
                subtitle: 'Formatted text block',
              };
            },
          },
        },
        {
          title: 'Image block',
          name: 'imageBlock',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              description: 'Field value is used only in admin panel for information purposes. Describe image, please.',
            },
            {
              title: 'Image is wide',
              name: 'isImageWide',
              type: 'boolean',
              description: 'Specify size of image with this option. Wide image scrolls on mobile devices',
              initialValue: false,
            },
            {
              title: 'Image',
              name: 'internalWarningMessagePlace',
              type: 'string',
              description: 'Place for error and warning messages',
              readOnly: true,
              validation: [
                (Rule) =>
                  Rule.custom((data, context) => {
                    const imageWithAlt = context.parent.image;

                    if (!imageWithAlt || !imageWithAlt.image) {
                      return true;
                    }

                    const imageRef = imageWithAlt.image.asset._ref;
                    const [_, width, height] = imageRef.match(/(\d+)x(\d+)-.*$/);
                    if (width < 300) {
                      return `Current size of image ${width}x${height} is very small and can have not enough clarity on big devices`;
                    }
                    return true;
                  }).warning(),
                (Rule) =>
                  Rule.custom((data, { parent }) => {
                    const imageWithAlt = parent.image;
                    if (!imageWithAlt || !imageWithAlt.image) {
                      return 'Image is required!';
                    }

                    return true;
                  }),
              ],
            },
            {
              title: ' ',
              name: 'image',
              type: 'imageWithAlt',
              description: ' ',
            },
          ],
          preview: {
            select: {
              isImageWide: 'isImageWide',
              title: 'title',
            },
            prepare(selection) {
              return {
                title: selection.title ?? ' ',
                subtitle: selection.isImageWide ? 'Wide image block' : 'Image block',
              };
            },
          },
        },
        {
          title: 'Quote block',
          name: 'quoteBlock',
          type: 'object',
          fields: [
            {
              title: 'Quote',
              name: 'quote',
              type: 'string',
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Author name',
              name: 'authorName',
              type: 'string',
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Job title',
              name: 'authorProfession',
              type: 'string',
              description: '(Optional)',
            },
          ],
          preview: {
            select: {
              quote: 'quote',
            },
            prepare(selection) {
              return {
                title: selection.quote ?? ' ',
                subtitle: 'Quote block',
              };
            },
          },
        },
        {
          title: 'Video block',
          name: 'videoBlock',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              description: 'Field value is used only in admin panel for information purposes. Describe video, please.',
            },
            {
              title: 'Url',
              name: 'url',
              type: 'string',
              description: 'Link to youtube embedded video.',
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare(selection) {
              return {
                title: selection.title ?? ' ',
                subtitle: 'Video block',
              };
            },
          },
        },
        {
          title: 'CTA block',
          name: 'ctaBlock',
          type: 'object',
          fields: [
            {
              title: 'Type',
              name: 'typeOfCta',
              type: 'string',
              options: {
                list: [
                  { title: 'Only Title', value: 'title' },
                  { title: 'Title and image', value: 'title_image' },
                  { title: 'Title and subtitle', value: 'both' },
                  { title: 'Title, subtitle and image', value: 'both_image' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              initialValue: 'Want to learn more? Subscribe to our newsletters.',
              hidden: ({ parent }) => !parent?.typeOfCta,
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Subtitle',
              name: 'subtitle',
              type: 'string',
              initialValue:
                'By creating a nomination of guardianship, you are telling the court (and your next of kin) who you wish to serve as ',
              hidden: ({ parent }) =>
                !parent?.typeOfCta || parent?.typeOfCta === 'title' || parent?.typeOfCta === 'title_image',
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Button text',
              name: 'buttonText',
              type: 'string',
              initialValue: 'Subscribe',
              hidden: ({ parent }) => !parent?.typeOfCta,
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Button link',
              name: 'link',
              type: 'string',
              initialValue: '/',
              hidden: ({ parent }) => !parent?.typeOfCta,
              validation: (Rule) => [
                Rule.required().custom((str) =>
                  str && str.trim() === '' && str !== '' ? 'Field must contain not only spaces' : true
                ),
              ],
            },
            {
              title: 'Image',
              name: 'image',
              type: 'array',
              description: 'Only 1 image required',
              hidden: ({ parent }) =>
                !parent?.typeOfCta || parent?.typeOfCta === 'title' || parent?.typeOfCta === 'both',
              validation: (Rule) =>
                Rule.max(1).custom((image, { parent }) => {
                  const error = 'image is required';
                  if (!parent?.typeOfCta || parent?.typeOfCta === 'title' || parent?.typeOfCta === 'both') {
                    return true;
                  }
                  if (image) {
                    return true;
                  }
                  return error;
                }),
              of: [
                {
                  title: 'raster image',
                  name: 'img',
                  type: 'imageWithAlt',
                },
                {
                  title: 'vector image',
                  name: 'svg',
                  type: 'svgUpload',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
            },
            prepare(selection) {
              return {
                title: selection.title ?? selection.subtitle ?? ' ',
                subtitle: 'CTA block',
              };
            },
          },
        },
      ],
    },
    {
      title: 'Related Articles',
      name: 'related',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'article' }],
        },
      ],
      validation: (Rule) => [
        Rule.required().min(1).error('Minimum 1 article is required'),
        Rule.max(2).error('Maximum 2 articles are allowed'),
        Rule.required().custom((articles) => {
          if (articles.length !== 2) {
            return true;
          }

          if (articles[0]._ref === articles[1]._ref) {
            return 'Articles must be different';
          }

          return true;
        }),
      ],
    },
  ],
  initialValue: () => ({
    publishedAt: new Date().toISOString(),
  }),
  preview: {
    select: {
      title: 'title',
      media: 'mainImage.image',
    },
  },
};
