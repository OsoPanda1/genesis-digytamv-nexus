
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/Header";
import MatrixEffect from "@/components/MatrixEffect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo válido.",
  }),
  password: z.string().min(1, {
    message: "Por favor ingresa tu contraseña.",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you'd typically authenticate the user
    console.log(values);
    toast.success("Inicio de sesión exitoso! Redirigiendo...");
    
    // Simulate successful login
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90 relative overflow-hidden">
      {/* Matrix Effect Background */}
      <MatrixEffect 
        color="rgba(0, 190, 255, 0.6)" 
        fontSize={16} 
        speed={60} 
        density={0.985} 
        text={["TAMV", "ONLINE", "GÉNESIS", "DIGYTAMV", "NETWORK"]} 
        className="opacity-30 mix-blend-screen"
      />

      <Header />

      <motion.main 
        className="flex-1 container max-w-md mx-auto px-4 py-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-lg p-6 shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-6 text-gradient bg-gradient-crystal animate-text-shimmer">
            Iniciar Sesión
          </h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-300">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="tu@email.com" 
                        className="bg-black/30 border-blue-500/30 focus:border-blue-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-300">Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password"
                        placeholder="********" 
                        className="bg-black/30 border-blue-500/30 focus:border-blue-400"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-blue-500/30 bg-black/30 focus:ring-blue-400"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                    Recordarme
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-crystal hover:bg-gradient-quantum transition-all duration-300"
              >
                Iniciar Sesión
              </Button>
            </form>
          </Form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-blue-500/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O inicia sesión con
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-4 gap-2">
              <Button variant="outline" size="icon" className="border-blue-500/30 hover:bg-blue-500/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-blue-500/30 hover:bg-blue-500/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-blue-500/30 hover:bg-blue-500/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="border-blue-500/30 hover:bg-blue-500/10">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </motion.main>
    </div>
  );
};

export default Login;
