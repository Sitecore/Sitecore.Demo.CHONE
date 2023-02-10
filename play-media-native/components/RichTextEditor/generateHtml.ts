const elementMap = {
  heading: (context: any, children: any) => {
    return `<H${context.attrs.level}>
          ${children}
        </H${context.attrs.level}>`;
  },
  paragraph: (_: any, children: any) => {
    return !!children ? `<p>${children}<p>` : `<br>`;
  },
  bulletList: (_: any, children: any) => {
    return `<ul>${children}</ul>`;
  },
  listItem: (_: any, children: any) => {
    return `<li>${children}</li>`;
  },
  orderedList: (_: any, children: any) => {
    return `<ol>${children}<ol>`;
  },
  codeBlock: (_: any, children: any) => {
    return `<pre><code>${children}</code></pre>`;
  },
  blockquote: (_: any, children: any) => {
    return `<blockquote>${children}</blockquote>`;
  },
  horizontalRule: (_: any, __: any) => {
    return `<hr />`;
  },
  text: (context: any, _: any) => {
    const hasMarks = !!context?.marks?.length;

    if (!hasMarks) {
      return `<span>${context.text}</span>`;
    }

    if (hasMark(context.marks, "link")) {
      const linkMark = context.marks.find((mark: any) => mark.type === "link");

      return `<a
          href=${linkMark.attrs.href}
          target=${linkMark.attrs.target}
        >
          ${context.text}
        </a>`;
    }

    if (hasMark(context.marks, "code")) {
      return `<code>${context.text}</code>`;
    }

    return getTextMarkup(context.marks, context.text);
  },
};

const hasMark = (marks: any, markType: string) => {
  return marks.some((mark: any) => mark.type === markType);
};

const getTextMarkup = (marks: any, text: string) => {
  let markup = `${text}`;

  if (hasMark(marks, "bold")) {
    markup = `<b>${markup}</b>`;
  }

  if (hasMark(marks, "italic")) {
    markup = `<i>${markup}</i>`;
  }

  if (hasMark(marks, "underline")) {
    markup = `<u>${markup}</u>`;
  }

  if (hasMark(marks, "strike")) {
    markup = `<strike>${markup}</strike>`;
  }

  return markup;
};

const getElementFromChild = (
  child: any,
  elementMap: Record<string, (context: any, children: any) => string>
): string => {
  if (child?.content?.length) {
    return elementMap[child.type](
      child,
      child.content
        .map((childContext: any) =>
          getElementFromChild(childContext, elementMap)
        )
        .join("")
    );
  }

  return elementMap[child.type](child, null);
};

const getElementTree = (content: any, elementMap: any) => {
  return content
    .map((element: any) => getElementFromChild(element, elementMap))
    .join("");
};

export const generateHtml = (rteJson) => {
  if (!rteJson) {
    return "";
  }

  const html = getElementTree(rteJson, elementMap);
  return `<div>${html}</div>`;
};
