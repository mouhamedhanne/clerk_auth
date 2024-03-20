import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { Loader2, LogIn, VerifiedIcon } from "lucide-react";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const SignUpAuth = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validationPassword = () => {
    if (password.length > 12) {
      toast.error("Le mot de passe doit contenir 12 caractères");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      await signUp.create({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    if (code.trim() === "") {
      toast.error("Le champs de vérification ne peut pas être vide.");
      return;
    }

    if (code.length !== 6) {
      toast.error("Le code doit contenir 6 caractères");
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success("Vérification réussi, vous êtes connecté !");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("le code est invalide");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      {!pendingVerification && (
        <form
          onSubmit={handleSubmit}
          className="h-screen w-screen flex justify-center items-center"
        >
          <Card className="px-[4rem] py-3">
            <CardHeader>
              <CardTitle className="">Créer un compte</CardTitle>
              <CardDescription className="">Créez votre compte</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <div className="mb-4">
              <label htmlFor="first_name" className="block mb-2">
                Prénom
              </label>
              <Input
                placeholder="John"
                type="text"
                name="first_name"
                id="first_name"
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block mb-2">
                Nom de famille
              </label>
              <Input
                placeholder="Doe"
                type="text"
                name="last_name"
                id="last_name"
                onChange={(e) => setLastName(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">
                Adresse Email
              </label>
              <Input
                placeholder="exemple@exemple.com"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">
                Mot de passe
              </label>
              <Input
                placeholder="********"
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>

            <CardFooter className="mt-6 flex justify-center">
              <Button
                onClick={validationPassword}
                type="submit"
                disabled={isLoading}
                className="gap-2 bg-home_secondary
                hover:bg-home_secondary hover:opacity-90"
              >
                {isLoading ? (
                  <Loader2 size="16" className="animate-spin" />
                ) : (
                  <LogIn size="16" />
                )}
                Créer un compte
              </Button>
            </CardFooter>
            <div className="flex gap-2 items-center justify-center">
              <p className="text-[14px]">Vous avez un compte?</p>
              <Link href="/sign-in" className="text-blue-700 text-[14px]">
                Connexion
              </Link>
            </div>
          </Card>
        </form>
      )}

      {pendingVerification && (
        <form className="h-screen w-screen flex justify-center items-center">
          <div className="block">
            <Input
              placeholder="Entrez le code de vérification..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type="submit"
              onClick={onPressVerify}
              className="mt-3 gap-2 bg-home_secondary hover:bg-home_secondary
               hover:opacity-90"
            >
              {isLoading ? (
                <Loader2 size="16" className="animate-spin" />
              ) : (
                <VerifiedIcon size="16" />
              )}
              Vérifier votre Email
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default SignUpAuth;
