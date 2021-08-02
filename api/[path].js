const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  try {
    const { path } = req.query;

    const { error, data } = await supabase.storage
      .from("images")
      .download(path);
    if (error) throw error;

    if (data) {
      const arr = await data.arrayBuffer();
      const buffer = Buffer.from(arr, "binary");
      const contentType = mime.contentType(path);
      console.log(contentType, data.type);
      res.setHeader("content-type", data.type);
      return res.send(buffer);
    }

    res.status(404).json({ msg: "Image not found!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error!" });
  }
};
