import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import {
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { add, checkmark } from "ionicons/icons";
import { CarInfo } from "../../types";
import { getCarsByUser } from "../../api/cars";
import { useHistory, useLocation } from "react-router";
import { assignQR, patchQR } from "../../api/qr";

const getCarName = (car: CarInfo) => {
  if (car.alias) {
    return car.alias;
  }
  return `${car.specs.make} ${car.specs.model} ${car.specs.modelYear}`;
};

const Profile = () => {
  const { push } = useHistory();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const qrToAssign = query.get("qr");
  const isAssigningQR = !!qrToAssign;
  const [selectedCar, setSelectedCar] = useState<CarInfo | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarInfo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getCars();
  }, [user]);

  const getCars = async () => {
    if (user) {
      const cars = await getCarsByUser(user.uid);
      setCars(cars);
    }
  };

  const logOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const handleSelectedCar = (car: CarInfo) => {
    if (selectedCar?.id === car.id) {
      setSelectedCar(null);
      return;
    }
    setSelectedCar(car);
  };

  const handleSignIn = async () => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          console.error("Usuario no encontrado");
          const createdUserCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);
          setUser(createdUserCredential.user);
          break;
        case "auth/wrong-password":
          console.error("Contraseña incorrecta");
          break;
        default:
          console.error("Error desconocido");
          break;
      }
      console.error(error);
    }
  };

  const handleAssignQR = async () => {
    if (!qrToAssign || !selectedCar?.id) {
      return;
    }
    await assignQR(qrToAssign, selectedCar.id, user.uid);
    push(`/profile`);
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonGrid className="ion-margin-top ion-padding-top">
          <IonSpinner name="circular" />
        </IonGrid>
      </IonPage>
    );
  }

  if (user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Perfil - {user.displayName || user.email}</IonTitle>
            <IonButton
              className="ion-margin-end"
              fill="outline"
              size="small"
              color="dark"
              slot="end"
              onClick={logOut}
            >
              Cerrar sesión
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItemGroup>
              <IonButton routerLink="/register-car" color="dark" expand="full">
                Agregar Vehículo
                <IonIcon icon={add}></IonIcon>
              </IonButton>
              <IonItemDivider>
                <IonLabel>Vehículos registrados</IonLabel>
              </IonItemDivider>
              {cars.map((car) =>
                isAssigningQR ? (
                  <IonItem key={car.id}>
                    <div>
                      <IonLabel>
                        {car.specs.make} {car.specs.model} {car.specs.modelYear}
                      </IonLabel>
                      <IonNote>{car.alias}</IonNote>
                    </div>
                    <IonCheckbox
                      onIonChange={() => handleSelectedCar(car)}
                      slot="end"
                      checked={selectedCar?.id === car.id}
                    ></IonCheckbox>
                  </IonItem>
                ) : (
                  <IonItem key={car.id} detail routerLink={`/car/${car.id}`}>
                    <div>
                      <IonLabel>
                        {car.specs.make} {car.specs.model} {car.specs.modelYear}
                      </IonLabel>
                      <IonNote>{car.alias}</IonNote>
                    </div>
                  </IonItem>
                )
              )}
              {isAssigningQR && (
                <IonButton
                  color="success"
                  expand="full"
                  disabled={!selectedCar}
                  onClick={handleAssignQR}
                >
                  Registrar QR
                  {selectedCar && ` a ${getCarName(selectedCar)}`}
                  <IonIcon icon={checkmark}></IonIcon>
                </IonButton>
              )}
              {isAssigningQR && !selectedCar && (
                <IonNote color="warning" className="ion-margin-start">
                  Selecciona un vehículo para asignar QR
                </IonNote>
              )}
            </IonItemGroup>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemGroup>
            <IonItem>
              <IonInput
                placeholder="Correo electrónico"
                value={email}
                onIonInput={({ detail }) => setEmail(detail.value ?? email)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="Contraseña"
                type="password"
                value={password}
                onIonInput={({ detail }) =>
                  setPassword(detail.value ?? password)
                }
              />
            </IonItem>
            <IonButton
              disabled={!password || !email}
              color="dark"
              expand="full"
              onClick={handleSignIn}
            >
              Iniciar sesión
            </IonButton>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>Otras opciones</IonItemDivider>
            <IonButton expand="full" onClick={handleSignInWithGoogle}>
              Iniciar sesión con Google
            </IonButton>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
