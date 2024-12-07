import { Session } from "@supabase/supabase-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Profile } from "@/types/auth/user";
import { supabase } from "@/utils/supabase";

type AuthData = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signInWithOtp: (email: string) => Promise<string | null>;
  verifyOtp: (email: string, otp: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  signInWithOtp: async () => null,
  verifyOtp: async () => null,
  signOut: async () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setSession(session);

    if (session) {
      const { data, error } = await supabase
        .from("profiles")
        .select(`id, name, email, userline(id, avatar)`)
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.log("Error fetching profile:" + error.message);
        return;
      }

      setProfile({
        id: session.user.id,
        userlineId: data.userlines[0]?.id,
        name: data.name as string,
        email: data.email,
        avatar: data.userlines[0]?.avatar,
      });
    }

    setLoading(false);
  };

  const signInWithOtp = async (email: string): Promise<string | null> => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });

    return error ? error.message : null;
  };

  const verifyOtp = async (
    email: string,
    otp: string
  ): Promise<string | null> => {
    const {
      data: { session },
      error,
    } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (!error) {
      await fetchSession();
    }

    return error ? error.message : null;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }

    setSession(null);
    setProfile(null);
  };

  useEffect(() => {
    fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, signInWithOtp, verifyOtp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
