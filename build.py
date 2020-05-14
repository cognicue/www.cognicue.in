import argparse, os, re, shutil, yaml
from datetime import datetime
from staticjinja import Site
from urllib import request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

SOURCE_PATH = os.path.join(BASE_DIR, "src")
BUILD_PATH = os.path.join(BASE_DIR, "build")
DATA_PATH = os.path.join(BASE_DIR, "data")

NEW_PAGE = os.path.join(SOURCE_PATH, "layout", "_page.html")
REGEX_PATH = r'^(?:\.{2})?(?:\/\.{2})*(\/[-/a-zA-Z0-9]+)+$'

class Template:

    def __init__(self, new_pages, datapath):
        self.datapath = datapath
        for page in new_pages:
            if re.match(REGEX_PATH, page):
                new_path = os.path.join(SOURCE_PATH, request.url2pathname(page[1:]))
                new_page = os.path.join(new_path, "index.html")
                if not os.path.exists(new_path):
                    os.makedirs(new_path)
                if not os.path.exists(new_page):
                    shutil.copyfile(NEW_PAGE, new_page)

    def context(self):
        datapath = self.datapath
        def _context(template):
            dirname = os.path.dirname(template.name).replace("/", "-")
            filepath = os.path.join(datapath, "{}.yaml".format(dirname or "home"))
            if os.path.exists(filepath):
                context = self.yaml_reader(filepath)
            else:
                context = {
                    "page_generated": datetime.now(),
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
        return {}

    def env_globals(self):
        return self.yaml_reader(os.path.join(self.datapath, "env_globals.yaml"))

    def yaml_reader(self, filename):
        with open(filename) as file:
            data = yaml.load(file, Loader=yaml.FullLoader)
        return data

if __name__ == "__main__":
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument("-n", nargs='*', default=[])
    args = arg_parser.parse_args()

    tmp = Template(new_pages = args.n, datapath=DATA_PATH)

    site = Site.make_site(
        searchpath=SOURCE_PATH,
        outpath=BUILD_PATH,
        staticpaths=["assets", "CNAME"],
        contexts=[(".*.html", tmp.context())],
        env_globals=tmp.env_globals(),
        filters=tmp.filters(),
        mergecontexts=True,
    )
    # enable automatic reloading
    site.render(use_reloader=True)
