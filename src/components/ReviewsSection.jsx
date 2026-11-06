import React, { useState } from 'react';
import { REVIEWS } from '../data/foodData';
import { useCart } from '../context/CartContext';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  X, 
  Quote 
} from 'lucide-react';

export default function ReviewsSection() {
  const { showToast } = useCart();
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: 'Food Enthusiast',
    rating: 5,
    title: '',
    comment: '',
    dishOrdered: 'Classic Veg Burger'
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      showToast('Please enter your name and review', 'error');
      return;
    }

    const created = {
      id: `r-${Date.now()}`,
      name: newReview.name,
      role: newReview.role || 'Happy Diner',
      avatar: '/images/review/review-1.jpg', // Default avatar
      rating: Number(newReview.rating),
      title: newReview.title || 'Incredible experience!',
      comment: newReview.comment,
      date: 'Just now',
      verified: true,
      dishOrdered: newReview.dishOrdered
    };

    setReviewsList([created, ...reviewsList]);
    setIsModalOpen(false);
    setNewReview({
      name: '',
      role: 'Food Enthusiast',
      rating: 5,
      title: '',
      comment: '',
      dishOrdered: 'Classic Veg Burger'
    });
    showToast('Thank you! Your review is now live 🎉', 'success');
  };

  return (
    <section id="reviews" className="py-20 bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Loved by 12,000+ Foodies
            </h2>
            <p className="mt-2 text-stone-500 dark:text-stone-400 text-sm">
              Discover what our community has to say about our flavors, speed, and warmth.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-stone-800 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 font-bold text-xs shadow-sm hover:border-brand-500 transition-all self-start md:self-end"
          >
            <Plus className="w-4 h-4 text-brand-600" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between relative group hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200 dark:text-stone-700" />
                </div>

                {/* Review Title & Comment */}
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white mb-1.5">
                    "{rev.title}"
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                    {rev.comment}
                  </p>
                </div>

                {/* Dish tag */}
                {rev.dishOrdered && (
                  <div className="inline-block px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-stone-500 dark:text-stone-400">
                    Ordered: {rev.dishOrdered}
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/30"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-stone-900 dark:text-white">
                      {rev.name}
                    </h4>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" title="Verified Diner" />
                    )}
                  </div>
                  <p className="text-[10px] text-stone-400 font-medium">
                    {rev.role} • {rev.date}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-extrabold text-lg text-stone-900 dark:text-white">
                Share Your Foodies Experience
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="e.g. Maya Sharma"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newReview.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-500 ml-2">{newReview.rating} out of 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  placeholder="e.g. Crispy and delicious!"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Detailed Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="What made your food or delivery special?"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Dish Ordered
                </label>
                <input
                  type="text"
                  value={newReview.dishOrdered}
                  onChange={(e) => setNewReview({ ...newReview, dishOrdered: e.target.value })}
                  placeholder="e.g. Maharaja Royal Burger"
                  className="w-full p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white text-xs border border-transparent focus:border-brand-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs shadow-md transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}

