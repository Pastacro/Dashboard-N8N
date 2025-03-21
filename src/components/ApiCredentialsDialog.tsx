import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Key, Globe, AlertCircle } from 'lucide-react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../lib/utils";

// Recréation des composants Dialog localement pour éviter les problèmes
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

interface ApiCredentialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (credentials: { apiUrl: string; apiKey: string }) => void;
  credentials: { apiUrl: string; apiKey: string } | null;
}

const ApiCredentialsDialog: React.FC<ApiCredentialsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  credentials
}) => {
  const [apiUrl, setApiUrl] = useState(credentials?.apiUrl || '');
  const [apiKey, setApiKey] = useState(credentials?.apiKey || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testSuccess, setTestSuccess] = useState(false);

  const handleSave = () => {
    if (!apiUrl || !apiKey) {
      setError('Please fill in all fields');
      return;
    }
    
    onSave({ apiUrl, apiKey });
  };

  const testConnection = async () => {
    if (!apiUrl || !apiKey) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTestSuccess(false);

    try {
      // Simulation d'un appel API (à remplacer par un vrai appel API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuler un succès
      setTestSuccess(true);
      setError(null);
    } catch (err) {
      setError('Failed to connect to the API. Please check your credentials.');
      setTestSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-neon-blue" />
            n8n API Credentials
          </DialogTitle>
          <DialogDescription>
            Enter your n8n API credentials to import workflows from your instance.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="apiUrl" className="text-sm font-medium">
              API URL
            </label>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <Input
                id="apiUrl"
                placeholder="https://your-n8n-instance.com"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              For n8n Cloud: https://your-cloud-instance<br />
              For self-hosted: http://your-host:port/path
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input
                id="apiKey"
                type="password"
                placeholder="Your n8n API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Create an API key in n8n: Settings → n8n API → Create an API key
            </p>
          </div>

          {error && (
            <div className="bg-destructive/20 p-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {testSuccess && (
            <div className="bg-green-500/20 p-3 rounded-md">
              <p className="text-sm text-green-500">Connection successful! You can now import workflows.</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={testConnection}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </Button>
          <Button
            onClick={handleSave}
            className="w-full sm:w-auto btn-neon-blue"
            disabled={isLoading}
          >
            Save Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiCredentialsDialog;
