import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { User, Mail, Lock, Upload, Save, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../utils/settings";
import { sessionInterface } from "../data/session";
import { useSession } from "../context/SessionContext";

interface ProfileFormData {
  full_name: string;
  email: string;
  password?: string;
  newPassword?: string;
  avatar?: FileList;
}

export function ProfileEditPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      full_name: "Иван Иванов",
      email: "ivan@example.com"
    }
  });
  const { user, removeUser } = useSession();
  let session: sessionInterface;
  useEffect(()=>{
    try{
      let stored = sessionStorage.getItem('user');
      if(stored){
        session = JSON.parse(stored) as sessionInterface;
      }
    } catch(err){
      console.log(err);
    }
  }, [])
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar_url ?? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop");

  const onSubmit = (data: ProfileFormData) => {
    //console.log("Profile update data:", data);
    alert("Профиль успешно обновлен!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    console.log("logging out");
    fetch(`${SERVER_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: user?.id})
    });
    sessionStorage.removeItem('user');
    removeUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Редактирование профиля</h1>
                <p className="mt-2 opacity-90">Обновите свои персональные данные</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="flex flex-col items-center pb-6 border-b border-gray-200">
              <div className="relative group">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-emerald-100">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <label htmlFor="avatar" className="absolute bottom-0 right-0 cursor-pointer">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-700 transition">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    {...register("avatar")}
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-4 text-sm text-gray-600">Нажмите на иконку для загрузки нового фото</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Полное имя
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="full_name"
                    type="text"
                    {...register("full_name", {
                      required: "Имя обязательно",
                      minLength: {
                        value: 2,
                        message: "Минимум 2 символа"
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="Иван Иванов"
                  />
                </div>
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email обязателен",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Некорректный email"
                      }
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Изменить пароль</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Текущий пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Новый пароль
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="newPassword"
                      type="password"
                      {...register("newPassword", {
                        minLength: {
                          value: 6,
                          message: "Минимум 6 символов"
                        }
                      })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
                  )}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Оставьте поля пустыми, если не хотите менять пароль</p>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                <Save className="w-5 h-5" />
                <span>Сохранить изменения</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
