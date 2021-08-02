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

    res.send(data);
  } catch (e) {
    console.log(e);
  }
};
