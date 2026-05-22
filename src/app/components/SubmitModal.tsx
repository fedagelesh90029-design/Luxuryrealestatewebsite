import { useState } from 'react';
import { X } from 'lucide-react';
import { useEstimate } from '../context/EstimateContext';
import { Button } from './Button';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
  const { items, clearAll } = useEstimate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill comment with selected items
  const defaultComment = items
    .map(item => `${item.workItem.name} - ${item.quantity} ${item.workItem.unit}`)
    .join('\n');

  if (!isOpen) return null;

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+7 (${numbers}`;
    if (numbers.length <= 4) return `+7 (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to backend
    console.log('Estimate Request:', {
      name,
      phone,
      comment: comment || defaultComment,
      items: items.map(item => ({
        name: item.workItem.name,
        quantity: item.quantity,
        unit: item.workItem.unit,
        price: item.workItem.price,
        total: item.quantity * item.workItem.price,
      })),
      grandTotal: items.reduce((sum, item) => sum + item.quantity * item.workItem.price, 0),
    });

    setSubmitted(true);
    setTimeout(() => {
      clearAll();
      onClose();
      setSubmitted(false);
      setName('');
      setPhone('');
      setComment('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/80 p-4">
      <div className="bg-white max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1A1A1A] hover:text-[#B58B52] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <h3 className="mb-4 text-[#3A5A40]">Спасибо!</h3>
            <p className="text-[#1A1A1A]/70">Менеджер свяжется с вами в ближайшее время</p>
          </div>
        ) : (
          <>
            <h3 className="mb-6">Отправить смету</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm">Ваше имя *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors"
                  placeholder="Иван Петров"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Телефон *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Комментарий</label>
                <textarea
                  value={comment || defaultComment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-[#1A1A1A]/20 focus:border-[#B58B52] focus:outline-none transition-colors resize-none"
                  placeholder="Выбранные работы..."
                />
              </div>

              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
