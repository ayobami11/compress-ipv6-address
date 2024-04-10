import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

import { Copy } from "lucide-react";

interface AddressAlertProps {
    originalIPv6Address: string,
    compressedIPv6Address: string,
    variant: 'public' | 'private'
};

const textMap: Record<AddressAlertProps['variant'], string> = {
    public: 'Public',
    private: 'Private'
};

const AddressItem: React.FC<AddressAlertProps> = ({
    originalIPv6Address,
    compressedIPv6Address,
    variant
}) => {

    const { toast } = useToast();

    const onCopy = () => {
        navigator.clipboard.writeText(compressedIPv6Address);

        toast({
            description: "Compressed address copied to clipboard."
        });
    }

    return (
        <Alert>
            <AlertTitle className='flex items-center gap-x-2 mb-6'>
                <Badge variant="secondary" className="tracking-wide">{textMap[variant]}</Badge>
                {
                    variant === "private" && compressedIPv6Address.startsWith("fc00") ?
                        <Badge variant="outline" className="tracking-wide">Reserved</Badge> : null
                }
            </AlertTitle>
            <AlertDescription className='mt-4 flex gap-4 items-center justify-between'>
                <dl className="flex flex-col gap-4">
                    <div className="flex gap-3 justify-between">
                        <dt>Original IPv6 Address:</dt>
                        <dd>
                            <code
                                className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
                            >
                                {originalIPv6Address}
                            </code>
                        </dd>
                    </div>
                    <div className="flex gap-3 justify-between">
                        <dt>Compressed IPv6 Address:</dt>
                        <dd>
                            <code
                                className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
                            >
                                {compressedIPv6Address}
                            </code>
                        </dd>
                    </div>
                </dl>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                variant='outline'
                                size='icon'
                                onClick={onCopy}
                            >
                                <Copy className='w-4 h-4' />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy compressed address</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </AlertDescription>
        </Alert>
    )
}

export default AddressItem;