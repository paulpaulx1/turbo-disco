import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fieldsets: [
    { name: "home", title: "Home page", options: { collapsible: false } },
  ],
  fields: [
    defineField({
      name: "artistName",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bio",
      title: "Footer bio",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "email", type: "email" }),
    defineField({
      name: "homeEyebrow",
      title: "Small line above the heading",
      type: "string",
      fieldset: "home",
      description: "e.g. The Painting Collection",
    }),
    defineField({
      name: "homeHeading",
      title: "Heading",
      type: "text",
      rows: 2,
      fieldset: "home",
      description:
        "Each line you type shows on its own line. Leave empty to use the portfolio’s title.",
    }),
    defineField({
      name: "homePortfolio",
      title: "Paintings shown",
      type: "reference",
      to: [{ type: "portfolio" }],
      fieldset: "home",
      description:
        "The first painting in this portfolio is shown large on the home page. To change it, drag another painting to the top of the portfolio. Leave empty to show the newest painting.",
    }),
    defineField({
      name: "navigation",
      title: "Menu",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description:
                "A page on this site (/gallery) or a full web address (https://…).",
              validation: (r) => r.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
