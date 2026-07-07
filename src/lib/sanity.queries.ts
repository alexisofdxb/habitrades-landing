const postFields = `{
  "slug": slug.current,
  title,
  excerpt,
  type,
  readTime,
  author,
  publishedAt,
  coverImage,
  "body": body[]{
    ...,
    _type == "block" => {
      ...,
      markDefs[]{
        ...,
        _type == "docLink" => {
          ...,
          "page": page->{
            "slug": slug.current,
            title
          }
        }
      }
    }
  },
  sections
}`;

export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) ${postFields}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${postFields}`;

export const postSlugsQuery = `*[_type == "post"].slug.current`;

const changelogFields = `{
  "slug": slug.current,
  date,
  label,
  afterHours,
  entries
}`;

export const allChangelogReleasesQuery = `*[_type == "changelogRelease"] | order(date desc) ${changelogFields}`;

export const changelogReleaseBySlugQuery = `*[_type == "changelogRelease" && slug.current == $slug][0] ${changelogFields}`;

export const changelogReleaseSlugsQuery = `*[_type == "changelogRelease"].slug.current`;

const docPageSummaryFields = `{
  "slug": slug.current,
  title,
  order,
  version,
  lastUpdated,
  description
}`;

export const docNavQuery = `*[_type == "docSection"] | order(order asc) {
  "slug": slug.current,
  title,
  order,
  "pages": *[_type == "docPage" && references(^._id)] | order(order asc) ${docPageSummaryFields}
}`;

const docPageFields = `{
  "slug": slug.current,
  title,
  order,
  version,
  lastUpdated,
  description,
  "body": body[]{
    ...,
    _type == "block" => {
      ...,
      markDefs[]{
        ...,
        _type == "docLink" => {
          ...,
          "page": page->{
            "slug": slug.current,
            title
          }
        }
      }
    }
  },
  "section": section->{
    "slug": slug.current,
    title
  }
}`;

export const docPageBySlugQuery = `*[_type == "docPage" && slug.current == $slug][0] ${docPageFields}`;

export const docPageSlugsQuery = `*[_type == "docPage"].slug.current`;