import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { Copy, Server } from "lucide-react";

interface AddressAlertProps {
    description: string,
    variant: 'public' | 'private'
};

const textMap: Record<AddressAlertProps['variant'], string> = {
    public: 'Public',
    private: 'Private'
};

const AddressItem: React.FC<AddressAlertProps> = ({
    description,
    variant
}) => {

    const { toast } = useToast();

    const onCopy = () => {
        navigator.clipboard.writeText(description);

        toast({
            description: "Address copied to clipboard."
        });
    }

    return (
        <Alert>
            <Server className='w-4 h-4' />
            <AlertTitle className='flex items-center gap-x-2'>
                <span>Compressed IPv6 Address</span>
                <Badge variant="secondary">
                    {textMap[variant]}
                </Badge>
                {
                    variant === "private" && description.startsWith("fc00") ?
                        (
                            <Badge variant="outline">Reserved</Badge>
                        ) : null
                }
            </AlertTitle>
            <AlertDescription className='mt-4 flex items-center justify-between'>
                <code
                    className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
                >
                    {description}
                </code>
                <Button
                    variant='outline'
                    size='icon'
                    onClick={onCopy}
                >
                    <Copy className='w-4 h-4' />
                </Button>
            </AlertDescription>
        </Alert>
    )
}

export default AddressItem;