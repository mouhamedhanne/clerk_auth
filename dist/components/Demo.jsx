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

import { LogIn } from "lucide-react";

const Demo = () => {
  return (
    <>
      <form className="h-screen w-screen flex justify-center items-center">
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
            />
          </div>

          <CardFooter className="mt-6 flex justify-center">
            <Button
              type="submit"
              className="gap-2 bg-home_secondary
                hover:bg-home_secondary hover:opacity-90"
            >
              <LogIn size="16" />
              Créer un compte
            </Button>
          </CardFooter>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-[14px]">Vous avez un compte?</p>
            <p className="text-blue-700 text-[14px]">Connexion</p>
          </div>
        </Card>
      </form>
    </>
  );
};

export default Demo;
