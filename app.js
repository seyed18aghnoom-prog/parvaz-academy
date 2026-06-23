// اتصال به Supabase
const supabaseUrl = "https://zqvcywavtqbaqfdhtflu.supabase.co";
const supabaseKey = "sb_publishable_6KS4Ids_vE1vmWq_f8Pigw_ZxMYwVq3";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

/* ثبت‌نام */
async function register() {
  const name = document.getElementById("name").value;
  const national = document.getElementById("national").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  // ساخت کاربر
  const { data: user, error } = await supabase.auth.signUp({
    email: phone + "@parvaz.com",
    password: password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // ذخیره اطلاعات در جدول
  await supabase.from("students").insert({
    name: name,
    national: national,
    phone: phone,
    user_id: user.user.id
  });

  alert("ثبت‌نام با موفقیت انجام شد");
}

/* ورود */
async function login() {
  const phone = document.getElementById("loginPhone").value;
  const password = document.getElementById("loginPass").value;

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: phone + "@parvaz.com",
    password: password
  });

  if (error) {
    alert(error.message);
    return;
  }

  // دریافت اطلاعات پروفایل
  const { data: profile } = await supabase
    .from("students")
    .select("*")
    .eq("user_id", user.user.id)
    .single();

  document.getElementById("profile").innerHTML =
    "نام: " + profile.name + "<br>" +
    "کد ملی: " + profile.national + "<br>" +
    "شماره همراه: " + profile.phone;
}
