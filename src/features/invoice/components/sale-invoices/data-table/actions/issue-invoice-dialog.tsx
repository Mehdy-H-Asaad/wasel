
import { MainButton } from '@/components/common/MainButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Send } from 'lucide-react';
import React, { useState } from 'react'

export const IssueInvoiceDialog = ({ onIssueInvoice, isLoading, dialogTriggerText }: { onIssueInvoice: () => void, isLoading: boolean, dialogTriggerText: string }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                    <Send className="size-4" />
                    {dialogTriggerText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{dialogTriggerText}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {dialogTriggerText.toLowerCase()}?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" className="w-fit justify-center items-center cursor-pointer" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <MainButton className="w-fit justify-center items-center cursor-pointer" isLoading={isLoading} loadingText={`${dialogTriggerText.toLowerCase()} Invoice`} onClick={() => onIssueInvoice()}>
                        {dialogTriggerText}
                    </MainButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
