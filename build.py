import argparse, os, glob, re, shutil, yaml
from datetime import datetime
from staticjinja import Site
from urllib import request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SOURCE_PATH = os.path.join(BASE_DIR, "src")
BUILD_PATH = os.path.join(BASE_DIR, "build")
DATA_PATH = os.path.join(BASE_DIR, "data")

NEW_PAGE = os.path.join(SOURCE_PATH, "layout", "_page.html")
NEW_POST = os.path.join(SOURCE_PATH, "layout", "_post.html")

REGEX_PATH = r'^(?:\.{2})?(?:\/\.{2})*(\/[-/a-zA-Z0-9]+)+$'

class Template:

    def __init__(self, new_pages, new_posts, datapath):
        self.datapath = datapath
        self.new_pages = new_pages
        self.new_posts = new_posts
        self.new_temps = dict()

        for page in new_pages+new_posts:
            if re.match(REGEX_PATH, page):

                path = request.url2pathname(page[1:])
                new_path = os.path.join(SOURCE_PATH, path)

                new_temp = os.path.join(path, "index.html")
                new_file = os.path.join(new_path, "index.html")

                if not os.path.exists(new_path):
                    os.makedirs(new_path)

                if not os.path.exists(new_file):
                    template = page in new_pages and NEW_PAGE or NEW_POST
                    shutil.copyfile(template, new_file)

                self.new_temps.update({new_temp: page})


    def context(self):
        datapath = self.datapath

        def _context(template):
            dirname = os.path.dirname(template.name).replace("/", "-")
            page_url = self.new_temps.get(template.name) or "/"
            page_title = page_url.title().replace("/", " ").replace("-", " ").strip()

            if "post" in template.blocks:
                post_filepath = os.path.join(datapath, 'post', "{}.yaml".format(dirname))
                if os.path.exists(post_filepath):
                    context = self.yaml_reader(post_filepath)
                else:
                    context = {
                        "page_generated": datetime.now().isoformat(),
                        "page_title": page_title,
                        "page_url": page_url,
                        "post_detail": {
                            "title": page_title,
                            "image": "/assets/img/blog/single_blog_1.png",
                            "excerpt": "Excerpt<br/>Modify data file: {}".format(post_filepath),
                            "sections": [
                                {"para": "Paragraph 1", "quote": "Quotes"},
                                {"para": "Paragraph 2"},
                                {"para": "Paragraph 3"},
                            ],
                        },
                        "author": {
                            "name": "Harvard Milan",
                            "photo": "/assets/img/blog/author.png",
                            "desc": "Author Description"
                        }
                    }
                    self.yaml_writer(post_filepath, context)
            else:
                page_filepath = os.path.join(datapath, "{}.yaml".format(dirname or "home"))
                if os.path.exists(page_filepath):
                    context = self.yaml_reader(page_filepath)
                else:
                    context = {
                        "page_generated": datetime.now().isoformat(),
                        "page_title": page_title,
                        "page_url": page_url,
                        "section": {
                            "heading": "Section Heading",
                            "text": "Section Paragraph<br/>Modify data file: {}".format(page_filepath)
                        }
                    }
                    self.yaml_writer(page_filepath, context)

            return context

        return _context


    def insights_context(self):
        datapath = self.datapath

        def _context(template):
            posts = glob.glob(os.path.join(datapath,"post","*.yaml"))
            posts.sort(key=os.path.getctime, reverse=True)
            context = list()
            for post in posts[:6]:
                c = self.yaml_reader(post) or {}
                post_c = {
                    "page_generated": datetime.fromisoformat(c.get("page_generated")),
                    "post_detail": c.get("post_detail"),
                    "page_url": c.get("page_url"),
                }
                context.append(post_c)
            return {
                "posts": context
            }
        return _context


    def filters(self):
        return {
            "summary_metric": self.summary_metric
        }

    @staticmethod
    def summary_metric(metric):
        return [
            dict(i)
            for i in sorted(filter(lambda x: x.get("summary"), metric.values()), key=lambda y:y.get("order"))
        ]


    def env_globals(self):
        return self.yaml_reader(os.path.join(self.datapath, "env_globals.yaml"))


    def yaml_reader(self, filename):
        with open(filename) as file:
            data = yaml.load(file, Loader=yaml.FullLoader)
        return data


    def yaml_writer(self, filepath, context):
        dirname = os.path.dirname(filepath)
        os.path.exists(dirname) or os.makedirs(dirname)
        with open(filepath, "w") as file:
            file.write(yaml.dump(context))


if __name__ == "__main__":
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-w", action='store_true', help="Build in watch mode")
    arg_parser.add_argument("-o", default=BUILD_PATH, help="Output directory path")
    arg_parser.add_argument("--page", nargs='*', default=[])
    arg_parser.add_argument("--post", nargs='*', default=[])
    args = arg_parser.parse_args()

    tmp = Template(new_pages=args.page, new_posts=args.post, datapath=DATA_PATH)

    site = Site.make_site(
        searchpath=SOURCE_PATH,
        outpath=os.path.abspath(args.o),
        staticpaths=[
            "assets",
            "CNAME",
            "favicon.ico",
            "robots.txt",
            "apple-touch-icon.png",
            "apple-touch-icon-precomposed.png",
        ],
        contexts=[
            (".*.html", tmp.context()),
            ("insights/index.html", tmp.insights_context()),
        ],
        env_globals=tmp.env_globals(),
        filters=tmp.filters(),
        mergecontexts=True,
    )
    # enable automatic reloading
    site.render(use_reloader=args.w)
