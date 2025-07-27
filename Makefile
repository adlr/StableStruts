FILES=\
	src/extension.js \
	src/metadata.json

OUT_DIR=~/.local/share/gnome-shell/extensions/stablestruts@adlr.info

install: $(FILES)
	mkdir -p $(OUT_DIR)
	cp -Rp $(FILES) $(OUT_DIR)

uninstall:
	rm -rf $(OUT_DIR)
