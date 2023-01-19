export const RICH_TEXT_RESPONSE = [
  {
    body: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Heading 1",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Heading 2",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              text: "Heading 3",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 4,
          },
          content: [
            {
              type: "text",
              text: "Heading 4",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 5,
          },
          content: [
            {
              type: "text",
              text: "Heading 5",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 6,
          },
          content: [
            {
              type: "text",
              text: "Heading 6",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Simple.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Bold.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "Italic.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "underline",
                },
              ],
              text: "Underlined.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "strike",
                },
              ],
              text: "Strikethrough.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "All ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "the",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "types",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "underline",
                },
              ],
              text: "of text",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "strike",
                },
              ],
              text: "combined",
            },
            {
              type: "text",
              text: " in one paragraph. Marking a word in here as heading, makes the whole paragraph a heading.",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 3,
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "Simple bold text",
            },
            {
              type: "text",
              text: " and heading in same paragraph (lets see what it returns).",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Links",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://www.sitecore.com/",
                    target: "_blank",
                    class: null,
                  },
                },
              ],
              text: "Standalone link.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "All ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
              text: "the",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "types",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "underline",
                },
              ],
              text: "of text",
            },
            {
              type: "text",
              text: " ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "strike",
                },
              ],
              text: "combined",
            },
            {
              type: "text",
              text: " in one paragraph. Plus a ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "www.sitecore.com",
                    target: "_blank",
                    class: null,
                  },
                },
              ],
              text: "link",
            },
            {
              type: "text",
              text: " inside a paragraph.",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Lists",
            },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Simple.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Bold.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "Italic.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "underline",
                        },
                      ],
                      text: "Underlined.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "strike",
                        },
                      ],
                      text: "Strikethrough.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "All ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "the",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "types",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "underline",
                        },
                      ],
                      text: "of text",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "strike",
                        },
                      ],
                      text: "combined",
                    },
                    {
                      type: "text",
                      text: " in one paragraph. Marking a word in here as heading, makes the whole paragraph a heading.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "orderedList",
          attrs: {
            start: 1,
          },
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Simple.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "Bold.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "Italic.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "underline",
                        },
                      ],
                      text: "Underlined.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "strike",
                        },
                      ],
                      text: "Strikethrough.",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "All ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "the",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "types",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "underline",
                        },
                      ],
                      text: "of text",
                    },
                    {
                      type: "text",
                      text: " ",
                    },
                    {
                      type: "text",
                      marks: [
                        {
                          type: "strike",
                        },
                      ],
                      text: "combined",
                    },
                    {
                      type: "text",
                      text: " in one paragraph. Marking a word in here as heading, makes the whole paragraph a heading.",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Code",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
              text: "Code element with just simple text.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: null,
          },
          content: [
            {
              type: "text",
              text: "Code block element with just simple text.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
              text: "All the types of text combined in one paragraph. This contained all sorts of text types and was marked as code to see if all other styles are gone in the data or remain there.",
            },
          ],
        },
        {
          type: "codeBlock",
          attrs: {
            language: null,
          },
          content: [
            {
              type: "text",
              text: "All the types of text combined in one paragraph. Marking a word in here as heading, makes the whole paragraph a heading.",
            },
          ],
        },
        {
          type: "heading",
          attrs: {
            level: 2,
          },
          content: [
            {
              type: "text",
              text: "Quotes",
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Quote element with simple text.",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "All ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "the",
                },
                {
                  type: "text",
                  text: " ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                  text: "types",
                },
                {
                  type: "text",
                  text: " ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "underline",
                    },
                  ],
                  text: "of text",
                },
                {
                  type: "text",
                  text: " ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "strike",
                    },
                  ],
                  text: "combined",
                },
                {
                  type: "text",
                  text: " in one paragraph. Marking a word in here as heading, makes the whole paragraph a heading.",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "Quote element with code.",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "codeBlock",
              attrs: {
                language: null,
              },
              content: [
                {
                  type: "text",
                  text: "Quote element with code block.",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Quote element with ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "www.sitecore.com",
                        target: "_blank",
                        class: null,
                      },
                    },
                  ],
                  text: "link",
                },
                {
                  type: "text",
                  text: ".",
                },
              ],
            },
          ],
        },
        {
          type: "blockquote",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "Quote element with list.",
                },
              ],
            },
            {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "one",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "two",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "listItem",
                  content: [
                    {
                      type: "paragraph",
                      content: [
                        {
                          type: "text",
                          text: "three",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "paragraph",
        },
        {
          type: "paragraph",
        },
      ],
    },
  },
];
