<h1 align="center">Frontend for MeherHowji.com</h1>
<p align="center">
<img src="https://img.shields.io/badge/-NextJS-black?logo=vercel"/>
<img src="https://img.shields.io/badge/-Markdown-black?logo=markdown"/>
<img src="https://img.shields.io/badge/-MDX-black?logo=markdown"/>
<img src="https://img.shields.io/badge/made%20by-meherhowji-blue"/>
<img src="https://img.shields.io/badge/license-MIT-blue">
</p>
<p align="center">
<img src="https://img.shields.io/twitter/follow/meherranjan?style=social">
<img src="https://img.shields.io/youtube/channel/subscribers/UCGHXKsMOVv0FEh3-_493eGA?label=YouTube&style=social">
</p>

## Technologies

- Language: JS, HTML & CSS
- Base Library: React
- Framework: NextJS
- Content: Markdown
- Content Database: Obsidian
- Renderer: MDX
- Styling: Bulma
- Animations: React Spring
- Theme: Designed by me, Meher Howji
- Deployment: Vercel

### Migration Tasklist

Migrating meherhowji.com from NextJS v13 to v14. Also, focus is on reducing dependencies, adding typescript, and course modules, user authentication and payment gateway.

- completed the navigation for desktop and mobile
- clean up
  - typography/layout/globals.scss - commented colors which will incrementally update, otherwise cleanedup
  - utility.scss
  - mixins.scss
  - heromodule.scss - cleaned up
- root level files copied
- next-config and next-seo at root level needs to be compared and merged

#### Later

- make the site mobile friendly.
- verify if the light and dark color themes are working fine or not.
- use skip-deploy commit substring to skip re-deployments. [Ref link](https://github.com/orgs/vercel/discussions/60#discussioncomment-3221395)
- remove bulma.io css and move to css grids

### References

- general and keeping up with latest nextjs: <https://leerob.io/>
- backlink: <https://franknoirot.co/projects/personal-website>
- plugins: <https://flowershow.app/> <https://portaljs.org>
- inspiration for likes feature: <https://joshwcomeau.com/>
