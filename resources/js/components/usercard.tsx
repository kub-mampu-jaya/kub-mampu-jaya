import { Mail, Send, User } from 'lucide-react';

interface UserCardProps {
    user:
        | {
              name: string;
              email: string;
          }
        | undefined;
    chatId: number;
    languageCode: string;
    sendType: string;
    onSend: () => void;
}

export function UserCard({
    user,
    chatId,
    languageCode,
    sendType,
    onSend,
}: UserCardProps) {
    const getButtonText = (type: string) => {
        switch (type) {
            case 'prepare':
                return 'Send Prepare';
            case 'middle':
                return 'Send Middle';
            case 'done':
                return 'Send Done';
            default:
                return 'Send';
        }
    };

    const getStatusBadge = (type: string) => {
        switch (type) {
            case 'prepare':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-700',
                    label: 'Prepare',
                };
            case 'middle':
                return {
                    bg: 'bg-amber-100',
                    text: 'text-amber-700',
                    label: 'In Transit',
                };
            case 'done':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-700',
                    label: 'Delivered',
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-700',
                    label: 'Unknown',
                };
        }
    };

    const status = getStatusBadge(sendType);

    return (
        <div className="group overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="space-y-4 p-6">
                {/* User Info */}
                {user ? (
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6900] to-[#FA2C36]">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h3 className="mb-1 truncate text-gray-900">
                                    {user.name}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Mail className="h-4 w-4 flex-shrink-0" />
                                    <p className="truncate">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                            <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-gray-500">User not found</p>
                    </div>
                )}

                {/* Details */}
                <div className="flex flex-wrap gap-2">
                    <div
                        className={`rounded-full px-3 py-1 ${status.bg} ${status.text}`}
                    >
                        {status.label}
                    </div>
                    <div className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                        {languageCode.toUpperCase()}
                    </div>
                </div>

                {/* Send Button */}
                <button
                    onClick={onSend}
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6900] to-[#FA2C36] px-4 py-3 text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                >
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    {getButtonText(sendType)}
                </button>
            </div>
        </div>
    );
}
