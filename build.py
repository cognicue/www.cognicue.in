import argparse, os, re, shutil, yaml
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
        for page in new_pages+new_posts:
            if re.match(REGEX_PATH, page):
                new_path = os.path.join(SOURCE_PATH, request.url2pathname(page[1:]))
                new_file = os.path.join(new_path, "index.html")
                if not os.path.exists(new_path):
                    os.makedirs(new_path)
                if not os.path.exists(new_file):
                    template = page in new_pages and NEW_PAGE or NEW_POST
                    shutil.copyfile(template, new_file)

    def context(self):
        datapath = self.datapath
        def _context(template):
            dirname = os.path.dirname(template.name).replace("/", "-")
            filepath = os.path.join(datapath, "{}.yaml".format(dirname or "home"))
            if os.path.exists(filepath):
                context = self.yaml_reader(filepath)
            else:
                if "post" in template.blocks:
                    context = {
                        "page_generated": datetime.now().isoformat(),
                        "page_title": "",
                        "post_detail": {
                            "title": "Post Title",
                            "excerpt": "Post Excerpt<br/>Modify data file: {}".format(filepath),
                            "sections": [
                                {"para": "Paragraph 1", "quote": "Quotes"},
                                {"para": "Paragraph 2"},
                                {"para": "Paragraph 3"},
                            ],
                        }
                    }
                else:
                    context = {
                        "page_generated": datetime.now().isoformat(),
                        "page_title": "",
                        "section": {
                            "heading": "Section Heading",
                            "text": "Section Paragraph<br/>Modify data file: {}".format(filepath)
                        }
                    }
                with open(filepath, "w") as file:
                    file.write(yaml.dump(context))
            return context
        return _context

    def filters(self):
        return {
            "metric_sort": self.metric_sort
        }

    @staticmethod
    def metric_sort(metric):
        return [
            {"mr_name": i["mr_name"], "sdk_name": i["sdk_name"]}
            for i in sorted(filter(lambda x: x["visible"], metric.values()), key=lambda y:y["order"])
        ]


    def env_globals(self):
        return self.yaml_reader(os.path.join(self.datapath, "env_globals.yaml"))

    def yaml_reader(self, filename):
        with open(filename) as file:
            data = yaml.load(file, Loader=yaml.FullLoader)
        return data

if __name__ == "__main__":
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("--page", nargs='*', default=[])
    arg_parser.add_argument("--post", nargs='*', default=[])
    args = arg_parser.parse_args()

    tmp = Template(new_pages = args.page, new_posts = args.post, datapath=DATA_PATH)

    site = Site.make_site(
        searchpath=SOURCE_PATH,
        outpath=BUILD_PATH,
        staticpaths=["assets", "CNAME", "favicon.ico"],
        contexts=[(".*.html", tmp.context())],
        env_globals=tmp.env_globals(),
        filters=tmp.filters(),
        mergecontexts=True,
    )
    # enable automatic reloading
    site.render(use_reloader=True)
