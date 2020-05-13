import os, yaml
from staticjinja import Site


class Template:

    def __init__(self, datapath):
        self.datapath = datapath

    def context(self):
        datapath = self.datapath
        def _context(template):
            dirname = os.path.dirname(template.name).replace(os.sep, ":")
            filepath = "{}{}.yaml".format(datapath, (dirname or "root"))
            if os.path.exists(filepath):
                return self.yaml_reader(filepath)
            return {}
        return _context

    def filters(self):
        return {}

    def env_globals(self):
        return self.yaml_reader(self.datapath+"env_globals.yaml")

    def yaml_reader(self, filename):
        with open(filename) as file:
            data = yaml.load(file, Loader=yaml.FullLoader)
        return data

if __name__ == "__main__":
    tmp = Template(datapath="./src/data/")
    site = Site.make_site(
        searchpath="./src/",
        staticpaths=["assets", "CNAME", "data"],
        outpath="./build/",
        contexts=[(".*.html", tmp.context())],
        env_globals=tmp.env_globals(),
        filters=tmp.filters(),
        mergecontexts=True,
    )
    # enable automatic reloading
    site.render(use_reloader=True)
