import { useEffect, useState } from "react";
import { supabase } from "../auth";
import { useNavigate } from "react-router-dom";

export default function AuthRedirect({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
      }

      setLoading(false);
    }
    
    checkUser();
  }, []);

  if (loading) return null;

  return children;
}
