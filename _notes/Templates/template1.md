---
layout: note
title: "template1"
date: 2025-08-02
excerpt: "---"
---

---
cssclass: literature-note
alias: [{% if shortTitle %}"{{shortTitle | safe}}"{% else %}"{{title | safe}}"{% endif %}]
---
{%- macro colorValueToName(color) -%}
	{%- switch color -%}
		{%- case "#ffff7f" -%}
			Relevant / important
		{%- case "#ff7f7f" -%}
			Disagree
		{%- case "#ffbf7f" -%}
			Questions / confusion
		{%- case "#7fff7f" -%}
			Agree
		{%- case "#7fffff" -%}
			Definitions / concepts
		{%- case "#ff7fff" -%}
			TODO / follow up
		{%- case "#bf7fbf" -%}
			Relevant to current task
		{%- default -%}
			Interesting but not relevant
	{%- endswitch -%}
{%- endmacro -%}

{%- macro calloutHeader(type) -%}
	{%- switch type -%}
		{%- case "highlight" -%}
			Highlight
		{%- case "strike" -%}
			Strikethrough
		{%- case "underline" -%}
			Underline
		{%- case "image" -%}
			Image
		{%- default -%}
			Note
	{%- endswitch -%}
{%- endmacro %}

> [!info]
> {%- for attachment in attachments | filterby("path", "endswith", ".pdf") %}
> - **Link:** [{{attachment.title}}](file://{{attachment.path | replace(" ", "%20")}})
{%- endfor -%}
{%- if abstractNote %}
> - **Abstract:** {{abstractNote}}
{%- endif -%}
{%- if bibliography %}
> - **Bibliography:** {{bibliography}}
{%- endif %}
{%- if hashTags %}
> - **Tags:** {{hashTags}}
{%- endif %}

## Annotations
{% persist "annotations" %}
{% set annots = annotations | filterby("date", "dateafter", lastImportDate) -%}
{% if annots.length > 0 %}
### Imported on {{importDate | format("YYYY-MM-DD h:mm a")}}

{% for color, annots in annots | groupby("color") -%}
#### {{colorValueToName(color)}}

{% for annot in annots -%}
> [!quote{% if annot.color %}|{{annot.color}}{% endif %}] {{calloutHeader(annot.type)}}
{%- if annot.annotatedText %}
> {{annot.annotatedText | nl2br}}
{%- endif -%}
{%- if annot.imageRelativePath %}
> ![{{annot.imageRelativePath}}](annotimagerelativepath)
{%- endif %}
{%- if annot.ocrText %}
> {{annot.ocrText}}
{%- endif %}
{%- if annot.comment %}
>
>> {{annot.comment | nl2br}}
{%- endif %}
>
> [Page {{annot.page}}](zotero://open-pdf/library/items/{{annot.attachment.itemKey}}?page={{annot.page}})

{% endfor -%}
{% endfor -%}
{% endif %}
{% endpersist %}


/* Yellow */
.literature-note .callout[data-callout-metadata="#ffff7f"] {
  --callout-color: 255, 204, 0;
}

/* Red */
.literature-note .callout[data-callout-metadata="#ff7f7f"] {
  --callout-color: 255, 59, 48;
}

/* Orange */
.literature-note .callout[data-callout-metadata="#ffbf7f"] {
  --callout-color: 255, 149, 0;
}

/* Green */
.literature-note .callout[data-callout-metadata="#7fff7f"] {
  --callout-color: 40, 205, 65;
}

/* Blue */
.literature-note .callout[data-callout-metadata="#7fffff"] {
  --callout-color: 0, 122, 255;
}

/* Pink */
.literature-note .callout[data-callout-metadata="#ff7fff"] {
  --callout-color: 255, 87, 255;
}

/* Purple */
.literature-note .callout[data-callout-metadata="#bf7fbf"] {
  --callout-color: 125, 84, 222;
}