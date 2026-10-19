with open(r"video-ai\prototype\app.js", "r", encoding="utf-8") as f:
    text = f.read()

text = text.replace("switchPanel('panel-content-kits');", "switchPanel('panel-projects-hub');")

with open(r"video-ai\prototype\app.js", "w", encoding="utf-8") as f:
    f.write(text)

print("Successfully replaced search redirects!")
